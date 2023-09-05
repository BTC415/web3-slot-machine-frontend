const canvas = document.getElementById('canvas-bg');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  alpha: true });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 100);

class Plane {
  constructor() {
    this.uniforms = {};
    this.texture = null;
    this.mesh = null;
  }
  loadTexture(image, callback) {
    const loader = new THREE.TextureLoader();
    loader.load(image, texture => {
      texture.minFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.encoding = THREE.sRGBEncoding; // this option is to render image's origine color
      this.texture = texture;
      this.mesh = this.createMesh();
      callback();
    });
  }
  createMesh() {
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(document.body.clientWidth, document.body.clientHeight) },

      imageResolution: {
        type: 'v2',
        value: new THREE.Vector2(1920, 1080) },

      texture: {
        type: 't',
        value: this.texture } };


    return new THREE.Mesh(
   
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vs').textContent,
      fragmentShader: document.getElementById('fs').textContent }));
  }
  render(time) {
    if (this.stop) return;
    this.uniforms.time.value += time / this.interval;
    if (this.uniforms.time.value > 1) {
      this.uniforms.time.value = 0;
      this.prev_num = this.next_num;
      this.uniforms.texPrev.value = this.textures[this.next_num];
      while (this.next_num == this.prev_num) {
        this.next_num = Math.floor(Math.random() * this.textures.length);
      }
      this.uniforms.texNext.value = this.textures[this.next_num];
    }
  }
  resize() {
    this.uniforms.resolution.value.set(document.body.clientWidth, document.body.clientHeight);
  }}

const plane = new Plane();

const render = () => {
  renderer.render(scene, camera);
};
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
};
const setEvent = () => {
  window.addEventListener('resize', () => {
    resizeWindow();
  });
};
const resizeWindow = () => {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  camera.aspect = document.body.clientWidth / document.body.clientHeight;
  camera.updateProjectionMatrix();
  //plane.resize();
  plane.mesh.material.uniforms.resolution.value.set(document.body.clientWidth, document.body.clientHeight);
  renderer.setSize(document.body.clientWidth, document.body.clientHeight);
};
const init = () => {
  renderer.setSize(document.body.clientWidth, document.body.clientHeight);
  renderer.setClearColor(0xffffff, 1.0);
  renderer.setPixelRatio(window.devicePixelRatio);

  plane.loadTexture('./BG.png', () => {
    scene.add(plane.mesh);
    setEvent();
    resizeWindow();
    renderLoop();
  });
};
init();