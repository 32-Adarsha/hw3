// cube
const positions = new Float32Array([
  -1, -1, -1,  // 0
   1, -1, -1,  // 1
   1,  1, -1,  // 2
  -1,  1, -1,  // 3
  -1, -1,  1,  // 4
   1, -1,  1,  // 5
   1,  1,  1,  // 6
  -1,  1,  1   // 7
]);

const colors = new Float32Array([
  1,0,0,  0,1,0,  0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,0, 1,0,1
]);


const indices = new Uint16Array([
  // Front
  4, 5, 6,   4, 6, 7,
  // Back
  1, 0, 3,   1, 3, 2,
  // Top
  3, 7, 6,   3, 6, 2,
  // Bottom
  0, 1, 5,   0, 5, 4,
  // Right
  1, 2, 6,   1, 6, 5,
  // Left
  0, 4, 7,   0, 7, 3,
]);

function createCylinder(slices = 20, radius = 0.8, height = 1.6) {
  let pos = [];
  let col = [];
  let idx = [];

  pos.push(0, height / 2, 0);
  col.push(0.2, 0.8, 0.2);
  let topCenter = 0;

  pos.push(0, -height / 2, 0);
  col.push(0.1, 0.5, 0.1);
  let bottomCenter = 1;

  for (let i = 0; i <= slices; i++) {
    let theta = (i * 2 * Math.PI) / slices;
    let x = radius * Math.cos(theta);
    let z = radius * Math.sin(theta);
    let r = 0.5 + 0.5 * Math.cos(theta);
    let g = 0.5 + 0.5 * Math.sin(theta);
    let b = 0.7;

    pos.push(x, height / 2, z);
    col.push(r, g, b);

    pos.push(x, -height / 2, z);
    col.push(r * 0.7, g * 0.7, b * 0.7);
  }

  for (let i = 0; i < slices; i++) {
    let top1 = 2 + i * 2;
    let bot1 = 3 + i * 2;
    let top2 = 2 + (i + 1) * 2;
    let bot2 = 3 + (i + 1) * 2;

    idx.push(top1, bot1, top2);
    idx.push(top2, bot1, bot2);

    idx.push(topCenter, top1, top2);
    idx.push(bottomCenter, bot2, bot1);
  }

  return {
    positions: new Float32Array(pos),
    colors: new Float32Array(col),
    indices: new Uint16Array(idx)
  };
}

function createSphere(stacks = 16, slices = 16, radius = 0.9) {
  let pos = [];
  let col = [];
  let idx = [];

  for (let i = 0; i <= stacks; i++) {
    let phi = (i * Math.PI) / stacks;
    let y = radius * Math.cos(phi);
    let rRing = radius * Math.sin(phi);

    for (let j = 0; j <= slices; j++) {
      let theta = (j * 2 * Math.PI) / slices;
      let x = rRing * Math.cos(theta);
      let z = rRing * Math.sin(theta);

      pos.push(x, y, z);
      col.push(
        0.5 + 0.5 * (x / radius),
        0.5 + 0.5 * (y / radius),
        0.5 + 0.5 * (z / radius)
      );
    }
  }

  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < slices; j++) {
      let first = i * (slices + 1) + j;
      let second = first + slices + 1;

      idx.push(first, second, first + 1);
      idx.push(second, second + 1, first + 1);
    }
  }

  return {
    positions: new Float32Array(pos),
    colors: new Float32Array(col),
    indices: new Uint16Array(idx)
  };
}

function createCone(slices = 20, radius = 0.8, height = 1.6) {
  let pos = [];
  let col = [];
  let idx = [];

  pos.push(0, height / 2, 0);
  col.push(1.0, 0.6, 0.2);
  let apex = 0;

  pos.push(0, -height / 2, 0);
  col.push(0.8, 0.4, 0.1);
  let bottomCenter = 1;

  for (let i = 0; i <= slices; i++) {
    let theta = (i * 2 * Math.PI) / slices;
    let x = radius * Math.cos(theta);
    let z = radius * Math.sin(theta);
    pos.push(x, -height / 2, z);
    col.push(0.9, 0.5 + 0.3 * Math.sin(theta), 0.2);
  }

  for (let i = 0; i < slices; i++) {
    let bot1 = 2 + i;
    let bot2 = 2 + i + 1;
    idx.push(apex, bot1, bot2);
    idx.push(bottomCenter, bot2, bot1);
  }

  return {
    positions: new Float32Array(pos),
    colors: new Float32Array(col),
    indices: new Uint16Array(idx)
  };
}

const cubeData = {
  positions: positions,
  colors: colors,
  indices: indices
};

const cylinderData = createCylinder();
const sphereData = createSphere();
const coneData = createCone();