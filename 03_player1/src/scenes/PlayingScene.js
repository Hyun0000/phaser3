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

        // PlayingScene의 background 설정
        // 여기서 "background1"은 LoadingScene에서 load한 asset이다. --> this.load.image("background1", bgImg1);
        setBackground(this, "background1"); // backgroundManager.js의 함수
    }
}