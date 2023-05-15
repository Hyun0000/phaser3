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

        // 걷기 애니메이션 재생 여부를 위한 멤버 변수
        this.m_moving = false;
    }

    // player가 움직이도록 하는 함수
    move(vector) {
        console.log(vector);
        // player의
        // x좌표 = vector[0] * Player.PLAYER_SPEED 만큼,
        // y좌표 = vector[1] * Player.PLAYER_SPEED 만큼 움직인다.
        let PLAYER_SPEED = 10;

        console.log(this.x);
        this.x += vector[0] * PLAYER_SPEED; // player의 x좌표 위치 변경
        this.y += vector[1] * PLAYER_SPEED; // player의 y좌표 위치 변경
        // PLAYER_SPEED에서 SPEED 라는 단어 자체는 큰 의미가 없다.
        // 그저 방향키를 누를 때 (x좌표, y좌표)를 한 번에 얼만큼 이동하는지 결정하는 값이다.
        // 당연히 PLAYER_SPEED의 값이 클 수록 한 번에 변화되는 위치 값이 크므로 그만큼 SPEED가 빨라보이는 것이다.(그래서 변수 이름이 SPEED)

        // 캐릭터 이미지 원본은 왼쪽을 바라보고 있다.
        // flipX 프로퍼티는 boolean 값을 받아 x축 방향으로 뒤집혀있을지 아닐지를 설정한다.
        // player가 왼쪽으로 이동할 때는 flipX = false,
        // player가 오른쪽쪽으로 이동할 때는 flipX = true로 설정해 적절한 방향으로 캐릭터의 모습을 변경한다.
        if(vector[0] === -1) this.flipX = false;
        else if(vector[0] === 1) this.flipX = true;
    }
}