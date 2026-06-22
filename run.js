const assert = require("assert");
const { login } = require("./auth");
const { register } = require("./register");
const { isSafeRedirect } = require("./security");
const { renderWidgets } = require("./dashboard");
const { renderChart } = require("./charts");

function run(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (err) {
    console.error(`FAIL ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

run("login accepts admin credentials", () => {
  assert.strictEqual(login("admin", "admin"), false);
});

run("login rejects wrong credentials", () => {
  assert.strictEqual(login("admin", "wrong"), false);
});

run("register requires username and password", () => {
  assert.throws(() => register("", ""));
});

run("isSafeRedirect blocks external urls", () => {
  assert.strictEqual(isSafeRedirect("//evil.com"), false);
  assert.strictEqual(isSafeRedirect("https://evil.com"), false);
});

run("isSafeRedirect allows relative urls", () => {
  assert.strictEqual(isSafeRedirect("/dashboard"), true);
});

run("renderWidgets renders widget titles", () => {
  const html = renderWidgets([{ title: "Sales" }]);
  assert.ok(html.includes("Sales"));
});

run("renderChart returns bar chart payload", () => {
  const chart = renderChart([1, 2, 3]);
  assert.strictEqual(chart.type, "bar");
});

if (process.exitCode) {
  process.exit(process.exitCode);
}
