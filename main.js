let input_html = document.getElementById("input_html");
let output_html = document.getElementById("output_html");
let open_newtab = document.getElementById("open_newtab");
let import_file = document.getElementById("import_file");
let input_file = document.getElementById("input_file");
let file_name = document.getElementById("file_name");
let import_cb = document.getElementById("import_cb");
let expand_btn = document.getElementById("expand_btn");
const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline';">`;
const update_input = () => {
  output_html.srcdoc = cspMeta + input_html.value;
};

input_html.addEventListener("input", () => {
  update_input();
});

const newtab = () => {
  let open_html = cspMeta + input_html.value;
  let blob = new Blob([open_html], { type: "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
};

open_newtab.addEventListener("click", () => {
  newtab();
});

expand_btn.addEventListener("click", () => {
  newtab();
});

import_file.addEventListener("click", () => {
  input_file.click();
});

input_file.addEventListener("change", async (event) => {
  const the_file = event.target.files[0];
  if (the_file) {
    file_name.textContent = the_file.name;
    const file_text = await the_file.text();
    input_html.value = file_text;
    update_input();
  }
});

import_cb.addEventListener("click", async () => {
  const the_text = await navigator.clipboard.readText();
  input_html.value = the_text;
  update_input();
});
