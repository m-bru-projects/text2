export function renderText(text) {
  return escapeHtml(text).replace(/\[\[(.+?)\]\]/g, '<span class="noun">$1</span>').replace(/\n/g, "<br>");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
