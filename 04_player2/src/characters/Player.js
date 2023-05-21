import Phaser from "phaser";
import Config from "../Config";

// Player가 Arcade 물리엔진의 영향을 받도록 extends
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, Config.width / 2, Config.height / 2, "player");

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.scale = 2;

        this.setDepth(20); // 10단위로 조절하는게 좋다.

        this.setBodySize(28, 32);

        // 걷기 애니메이션 재생 여부를 위한 멤버 변수
        this.m_moving = false;
    }

    move(vector) {
        let PLAYER_SPEED = 10;

        this.x += vector[0] * PLAYER_SPEED; // player의 x좌표 위치 변경
        this.y += vector[1] * PLAYER_SPEED; // player의 y좌표 위치 변경
        if(vector[0] === -1) this.flipX = false;
        else if(vector[0] === 1) this.flipX = true;
    }
}