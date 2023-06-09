import Config from "../Config";

/**
 * scene의 배경화면을 설정하는 함수
 * @param {Phaser.Scene} scene
 * @param {string} backgroundTexture
 */
export function setBackground(scene, backgroundTexture) {
    // tileSprite : 게임 화면이 background image보다 큰 경우 background image를 타일처럼 붙여서 보여주는 이미지
    // (CSS의 background-repeat: repeat; 같은 느낌)
    scene.m_background = scene.add.tileSprite(
        0,
        0,
        Config.width,
        Config.height,
        backgroundTexture
    ).setOrigin(0, 0); // setOrigin : tileSprite 자체의 원점(0, 0) 위치를 설정해주는 함수
}