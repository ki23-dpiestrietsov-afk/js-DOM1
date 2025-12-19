const inputA = document.getElementById("a");
const inputB = document.getElementById("b");
const resultValue = document.getElementById("resultValue");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

function setMessage(text, type) {
  message.textContent = text || "";
  message.className = "message" + (type ? " " + type : "");
}

function normalizeNumberString(s) {
  return String(s).trim().replace(",", ".");
}

function parseNumber(value) {
  const raw = normalizeNumberString(value);
  if (raw === "") return { ok: false, value: null };
  const num = Number(raw);
  if (!Number.isFinite(num)) return { ok: false, value: null };
  return { ok: true, value: num };
}

function roundToHundredthsIfNeeded(n) {
  if (!Number.isFinite(n)) return n;
  if (Number.isInteger(n)) return n;
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function calculate(op) {
  const a = parseNumber(inputA.value);
  const b = parseNumber(inputB.value);

  if (!a.ok || !b.ok) {
    resultValue.textContent = "—";
    setMessage("Введіть ДВА коректні числа (без букв/символів).", "error");
    return;
  }

  let res;

  if (op === "add") res = a.value + b.value;
  if (op === "sub") res = a.value - b.value;
  if (op === "mul") res = a.value * b.value;

  if (op === "div") {
    if (b.value === 0) {
      resultValue.textContent = "—";
      setMessage("Ділення на нуль неможливе.", "error");
      return;
    }
    res = a.value / b.value;
  }

  res = roundToHundredthsIfNeeded(res);
  resultValue.textContent = String(res);
  setMessage("Готово ✅", "ok");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-op]");
  if (!btn) return;
  calculate(btn.dataset.op);
});

clearBtn.addEventListener("click", () => {
  inputA.value = "";
  inputB.value = "";
  resultValue.textContent = "—";
  setMessage("");
  inputA.focus();
});
