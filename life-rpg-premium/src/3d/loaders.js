export async function loadGLTF(path) {
  return fetch(path).then(response => response.arrayBuffer());
}

export async function loadHDRI(path) {
  return fetch(path).then(response => response.arrayBuffer());
}
