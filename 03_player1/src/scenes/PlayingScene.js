import Phaser from "phaser";
import Player from "../characters/Player";
import { setBackground } from "../utils/backgroundManager";

export default class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        // 사용할 sound들을 추가해놓는 부분
        // load function : 어떤 scene에서든 전역적으로 asset을 사용할 수 있도록 load (LoadingScene.js 참고)
        // add function  : 해당 scene에서 asset을 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용
        // cf) this.xxxx 에서 xxxx 자리에 적힌 것들이 멤버 변수들이다.
        this.sound.pauseOnBlur  = false;
        this.m_beamSound        = this.sound.add("audio_beam");
        this.m_scratchSound     = this.sound.add("audio_scratch");
        this.m_hitMobSound      = this.sound.add("audio_hitMob");
        this.m_growlSound       = this.sound.add("audio_growl");
        this.m_explosionSound   = this.sound.add("audio_explosion");
        this.m_expUpSound       = this.sound.add("audio_expUp");
        this.m_hurtSound        = this.sound.add("audio_hurt");
        this.m_nextLevelSound   = this.sound.add("audio_nextLevel");
        this.m_gameOverSound    = this.sound.add("audio_gameOver");
        this.m_gameClearSound   = this.sound.add("audio_gameClear");
        this.m_pauseInSound     = this.sound.add("audio_pauseIn");
        this.m_pauseOutSound    = this.sound.add("audio_pauseOut");

        // player를 m_player라는 멤버 변수로 추가
        // new Player(this) --> (Player class의 인스턴스 생성, 자기 자신(PlayingScene)을 scene으로 전달)
        this.m_player = new Player(this); // characters/Player.js

        // 캐릭터가 화면 밖으로 나가지 않도록 막는다.
        this.m_player.setCollideWorldBounds(true);

        // PlayingScene의 background 설정
        // 여기서 "background1"은 LoadingScene에서 load한 asset이다. --> this.load.image("background1", bgImg1);
        setBackground(this, "background1"); // backgroundManager.js의 함수

        // m_cursorKeys = 사용자 키보드 입력값을 받을 수 있는 변수
        // 입력값 = (up, down, left, right, space, shift)
        // ex) m_cursorKeys.left.isDown = 사용자가 왼쪽 방향키를 눌렀는지 여부
        this.m_cursorKeys = this.input.keyboard.createCursorKeys();
    }

    // 키보드 이벤트는 매 frame 마다 탐지를 해야하기 때문에 update function을 만들었다.
    update() {
        // movePlayerManager = 직접 만든 함수(phaser 내장 함수 아님)
        this.movePlayerManager(); // 매 순간 movePlayerManager function이 실행되는 것이다.
    }

    movePlayerManager() {
        if (this.m_cursorKeys.left.isDown || this.m_cursorKeys.right.isDown || this.m_cursorKeys.up.isDown || this.m_cursorKeys.down.isDown) {
            // 방향키가 눌리면 애니메이션 재생
            if (!this.m_player.m_moving) { // player가 움직이면 true / 멈춰있으면 false
                // "player_anim"는 LoadingScene.js의 create function에 있다.
                // 방향키에 손을 떼서 멈추기 직전까지 계속해서 아래 코드가 실행된다.(한 번 play 되면 계속해서 play 된다.)
                this.m_player.play("player_anim"); // player_anim를 play 할 것이다.(재생할 것이다.)
            }
            this.m_player.m_moving = true;
        } else {
            // 방향키를 떼면 애니메이션 정지
            if (this.m_player.m_moving) {
                // "player_idle"는 LoadingScene.js의 create function에 있다.
                this.m_player.play("player_idle");
            }
            this.m_player.m_moving = false;
        }

        // vector 변수를 사용해 움직임 관리
        // x좌표와 y좌표가 '얼만큼 이동했는지'가 아니라 '어디로 이동하고 있는지를 관리하는 변수'이다.
        // (어디로 이동하고 있는지 = 어느 방향을 향하고 있는지)
        // 이것을 이용해 방향에 따른 캐릭터의 모습을 실시간으로 변경해줄 것이다.
        let vector = [0, 0]; // [x좌표 방향, y좌표 방향]

        // vector[0]은 (-1, 0, 1) 중 하나의 값만 갖는다.
        if(this.m_cursorKeys.left.isDown) {
            vector[0] += -1;
            // 이 값이 계속 누적돼서 -1, -2, -3, -4 ... 이렇게 되는게 아니다.
            // update function이 실행될때마다 movePlayerManager function도 실행되므로
            // vector 변수도 계속해서 [0, 0]으로 초기화 된다.
            // 따라서 사용자가 왼쪽 방향키를 누를 때마다 (vector[0] = -1)로 계속해서 값이 변경되는 것이지
            // -1 값이 누적되는게 아니다.
        } else if(this.m_cursorKeys.right.isDown) {
            vector[0] += 1;
        }

        // vector[1]도 (-1, 0, 1) 중 하나의 값만 갖는다.
        if(this.m_cursorKeys.up.isDown) {
            vector[1] += -1;
        } else if(this.m_cursorKeys.down.isDown) {
            vector[1] += 1;
        }

        // vector 변수를 player class의 move method의 parameter로 넘긴다.
        this.m_player.move(vector);
    }
}