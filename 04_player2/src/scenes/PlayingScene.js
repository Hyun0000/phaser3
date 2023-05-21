import Phaser from "phaser";
import Player from "../characters/Player";
import Config from "../Config";
import { setBackground } from "../utils/backgroundManager";

export default class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
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

        this.m_player = new Player(this);

        // 사용자가 보고 있는 화면이 m_player를 따라가게 한다.
        this.cameras.main.startFollow(this.m_player);
        
        // 캐릭터가 화면 밖으로 나갈 수 있는지 여부를 설정
        // this.m_player.setCollideWorldBounds(true);

        setBackground(this, "background1");
        this.m_cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        // 캐릭터 움직임
        this.movePlayerManager();

        // 무한 배경(= camera가 가는 곳으로 background가 따라 움직이도록 해준다.)
        // 캐릭터가 움직일 때마다 배경화면(m_background)의 X 좌표를 설정
        this.m_background.setX(this.m_player.x - Config.width / 2);
        // 캐릭터가 움직일 때마다 배경화면(m_background)의 Y 좌표를 설정
        this.m_background.setY(this.m_player.y - Config.height / 2);

        // tilePosition을 player가 움직이는 만큼 이동시켜 마치 무한 배경인 것처럼 나타내준다.
        // (player가 움직일 때마다 타일도 움직이는 것처럼 보이게 한다.)
        this.m_background.tilePositionX = this.m_player.x - Config.width / 2;
        this.m_background.tilePositionY = this.m_player.y - Config.height / 2;

        // cf) m_background 변수는 backgroundManager.js의 setBackground function에 있다.
    }

    movePlayerManager() {
        if (this.m_cursorKeys.left.isDown || this.m_cursorKeys.right.isDown || this.m_cursorKeys.up.isDown || this.m_cursorKeys.down.isDown) {
            // 방향키가 눌리면 애니메이션 재생
            if (!this.m_player.m_moving) this.m_player.play("player_anim");
            this.m_player.m_moving = true;
        } else {
            // 방향키를 떼면 애니메이션 정지
            if (this.m_player.m_moving) this.m_player.play("player_idle");
            this.m_player.m_moving = false;
        }

        let vector = [0, 0]; // [x좌표 방향, y좌표 방향]
        // 좌우
        if(this.m_cursorKeys.left.isDown) vector[0] += -1;
        else if(this.m_cursorKeys.right.isDown) vector[0] += 1;
        // 위아래
        if(this.m_cursorKeys.up.isDown) vector[1] += -1;
        else if(this.m_cursorKeys.down.isDown) vector[1] += 1;

        this.m_player.move(vector);
    }
}