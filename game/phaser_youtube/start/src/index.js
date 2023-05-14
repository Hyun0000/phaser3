import Phaser from 'phaser';
// import logoImg from './assets/logo.png';
import bgImg1 from "./assets/background.png";
import playerImg from "./assets/player.png";

class MyGame extends Phaser.Scene {
    constructor () {
        super();
    }

    preload () {
        this.load.image("background1", bgImg1);

        // this.load.image("player", playerImg);
        this.load.spritesheet("player", playerImg, {
            frameWidth: 32,
            frameHeight: 36
        });
        // frameWidth: 32, frameHeight: 36이 캐릭터 하나의 크기이다.
        // frameWidth: 64로 지정하면 캐릭터 2개가 화면에 load 된다.
    }
    
    create () {
        // ============== 배경 ==============
        this.backgroundimg = this.add.image(0, 0, 'background1'); // (x축, y축)
        // 아래와 같이 안할 경우 load 되는 이미지의 중심점으로 잡아 1/4 크기가 된다.
        this.backgroundimg.setOrigin(0, 0);

        // ============== 캐릭터 ==============
        // this.load.image에서 this.load.spritesheet로 변경
        this.lion = this.add.sprite(config.width / 2, config.height / 2, 'player');

        // this.lion = this.add.image(config.width / 2, config.height / 2, 'player');
        // this.lion.setOrigin(0, 0); 캐릭터를 정중앙에 위치시켜야하므로 주석처리

        // 크기 1.5배로
        this.lion.scale = 1.5;

        // x축 방향 뒤집기
        // this.lion.flipX = true;
        
        // y축 방향 뒤집기
        // this.lion.flipY = true;

        // 기울기(이걸 update function에 두면 부드럽게 캐릭터 방향 전환 가능)
        // this.lion.angle += 10;

        // ============== 캐릭터 움직이기(애니메이션 만들기) ==============
        // 이동
        this.anims.create({
            key: "lion_anim",
            frames: this.anims.generateFrameNumbers('player'), // 'player'이미지를 frame으로 사용하겠다.
            frameRate: 12, // 1초당 12프레임
            repeat: -1 // 몇 번 반복할것이냐(-1 = 무한)
        });
        
        // 정지
        this.anims.create({
            key: "lion_idle",
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 0
            }),
            frameRate: 1,
            repeat: 0
        });

        // 캐릭터 움직이기
        // this.lion.play('lion_anim');

        // 캐릭터 멈추기
        // this.lion.play('lion_idle');

        // this.input.keyboard.createCursorKeys() : 입력된 key에 대한 정보를 알 수 있다.
        this.keyboardInput = this.input.keyboard.createCursorKeys();
        this.lion.moving = false;
        // ============== 안내문구 ==============
        this.add.text(20, 20, "'위니브 월드 : 새로운 시대'에 오신 것을 환영합니다.", {
            font: '25px 배달의민족 주아 TTF',
            fill: '#f5e99f' // 16진수나 컬러이름
        });
    }

    update() { // 화면이 update 될 때마다 실행
        // console.log('update');
        this.move(this.lion); // 함수 이름은 마음대로
    }

    move(lion) {
        const PLAYER_SPEED = 3;

        if (this.keyboardInput.left.isDown || this.keyboardInput.right.isDown || this.keyboardInput.up.isDown || this.keyboardInput.down.isDown) {
            // 방향키를 누르면 이동
            if(!lion.moving) lion.play('lion_anim');
            lion.moving = true;
        } else {
            // 방향키를 떼면 멈춤
            if(lion.moving) lion.play('lion_idle');
            lion.moving = false;
        }

        if (this.keyboardInput.left.isDown) {
            lion.x -= PLAYER_SPEED;
            lion.flipX = false; // x축은 방향 전환도 해줘야함
        } else if (this.keyboardInput.right.isDown) {
            lion.x += PLAYER_SPEED;
            lion.flipX = true; // x축은 방향 전환도 해줘야함
        }
        if (this.keyboardInput.up.isDown) {
            lion.y -= PLAYER_SPEED;
        } else if (this.keyboardInput.down.isDown) {
            lion.y += PLAYER_SPEED;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: process.env.DEBUG === "true" // debug 옵션 = true
        }
    },
    scene: MyGame
};

const game = new Phaser.Game(config);