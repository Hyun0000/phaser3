import Phaser from "phaser";
import Config from "../Config";

// Player가 Arcade 물리엔진의 영향을 받도록 extends
export default class Player extends Phaser.Physics.Arcade.Sprite {
    // 어느 scene에 Player가 나올지 정해줘야 하므로 argument로 scene을 받는다.
    // 참고로 scene의 constructor는 parameter가 없다.
    constructor(scene) {
        // 화면의 가운데에 player를 추가
        // 마지막 "player" string이 identifier(식별자)이다. by LoadingScene.js
        super(scene, Config.width / 2, Config.height / 2, "player");

        // scene.add.existing : scene에 오브젝트 추가
        scene.add.existing(this);

        // scene.physics.add.existing : scene의 물리엔진에 오브젝트를 추가
        scene.physics.add.existing(this);

        // scale 프로퍼티를 조절해 크기 조절(디폴트: 1)
        this.scale = 2;

        // depth를 조절해 어떤 오브젝트가 앞에 오고 뒤에 올지 설정
        // CSS의 z-index와 비슷한 개념(디폴트: 0)
        this.setDepth(20); // 10단위로 조절하는게 좋다.

        // 해당 오브젝트가 물리적으로 어느정도의 면적을 차지할 지 설정하는 함수(디폴트는 이미지 사이즈)
        // 하지만 디폴트는 추후 몹을 추가했을 때 잘 부딪히는 느낌이 드므로 원본 이미지보다 약간 작게 설정
        this.setBodySize(28, 32);
    }
}