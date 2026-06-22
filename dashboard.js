function renderWidgets(widgets) {
  return widgets.map((w) => `<div class="widget">${w.title}</div>`).join("\n");
}

module.exports = { renderWidgets };
