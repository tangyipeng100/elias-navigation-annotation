"use strict";
const stages = [
  { en: ["Region inference", "Route frames, motion geometry, and the scene vocabulary establish start, goal, and traversed regions. Visible does not mean entered; unknown remains valid when evidence is insufficient.", "Input: route observations + motion geometry + scene prior."], zh: ["区域判断", "路线帧、运动几何与场景词汇用于判断起始、终止及经过的区域。看见不等于进入；证据不足时保留 unknown。", "输入：路线观察 + 运动几何 + 场景先验。"] },
  { en: ["Open terminal observation", "Describe visible objects, relative positions, and stopping geometry before seeing canonical endpoint references. This stage deliberately bypasses scene-prior injection.", "Input: terminal and lateral views + stopping geometry. No canonical retrieval yet."], zh: ["开放终点观察", "在看到规范化终点参考之前，描述可见物体、相对位置和停止几何。场景先验注入明确绕过这一阶段。", "输入：末端与侧向图像 + 停止几何；尚未引入规范词检索。"] },
  { en: ["Canonical retrieval", "Local matching over bilingual names and aliases proposes at most eight lexical candidates and four reference images. Retrieved names are hypotheses, not detections.", "Input: open observations + scene vocabulary. Deterministic local operation; no model call."], zh: ["规范词检索", "在双语名称与别名中进行本地匹配，最多返回八个词汇候选与四张参考图。检索名称仍是待验证假设，不是检测结果。", "输入：开放观察 + 场景词汇；确定性本地操作，不调用模型。"] },
  { en: ["Dual-anchor grounding", "Resolve a forward anchor (what the robot faces) separately from a place anchor (where it stops). Reconcile both with images, geometry, and retrieved hypotheses; uncertainty can remain.", "Input: terminal and lateral evidence + motion geometry + canonical hypotheses."], zh: ["双锚点终点对齐", "区分前向锚点（面向什么）与停靠锚点（停在哪里），结合图像、几何与检索假设判断空间关系。允许保留不确定性。", "输入：末端与侧向证据 + 运动几何 + 规范名称假设。"] },
  { en: ["Structured bilingual generation", "Generate ordered actions and Chinese–English instructions from grounded regions and endpoint relations. An explicit terminal-clause constraint preserves the stopping relation.", "Input: structured region evidence + grounded anchors + route observations."], zh: ["结构化双语生成", "依据对齐后的区域与终点关系生成动作序列和中英文指令。明确的终点句约束要求保留停止关系。", "输入：结构化区域证据 + 终点锚点 + 路线观察。"] },
  { en: ["Consistency gate", "A separate generation-time check flags unsupported actions, regions, endpoint relations, and bilingual disagreement. Deterministic checks add missing-field and unresolved-evidence flags. The decision is accept, review, or abstain.", "Separate from the later method-blind GPT-5.5 evaluator. Does not rewrite candidates."], zh: ["独立一致性接受门", "生成阶段的独立检查标记无证据的动作、区域、终点关系及双语不一致；确定性检查补充缺失字段与未解决证据标记，决定接受、复核或暂不判断。", "与后续 GPT-5.5 方法盲评不同；不改写候选。"] }
];
const results = { rendered: [95, 25, 5, 75, "19/20 → 5/20", "1/20 → 15/20"], robot: [100, 20, 0, 80, "10/10 → 2/10", "0/10 → 8/10"] };
let language = "en", stage = 0, result = "rendered";
function updateStage() {
  const [title, copy, input] = stages[stage][language];
  document.getElementById("stage-number").textContent = String(stage + 1).padStart(2, "0");
  document.getElementById("stage-title").textContent = title;
  document.getElementById("stage-copy").textContent = copy;
  document.getElementById("stage-input").textContent = input;
  document.querySelectorAll("[data-stage]").forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.stage) === stage)));
}
function updateResult() {
  const values = results[result];
  ["error-before", "error-after", "usable-before", "usable-after"].forEach((id, i) => { document.getElementById(id).textContent = `${values[i]}%`; });
  const suffix = language === "zh" ? " 条候选" : " candidates";
  document.getElementById("error-count").textContent = values[4] + suffix;
  document.getElementById("usable-count").textContent = values[5] + suffix;
  document.querySelectorAll("[data-result]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.result === result)));
}
function setLanguage(value) {
  language = value === "zh" ? "zh" : "en";
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-en][data-zh]").forEach(element => { element.textContent = element.dataset[language]; });
  document.querySelectorAll("[data-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
  try { localStorage.setItem("elias-language", language); } catch { /* Browser-local preferences are optional. */ }
  updateStage(); updateResult();
}
document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
document.querySelectorAll("[data-stage]").forEach(button => button.addEventListener("click", () => { stage = Number(button.dataset.stage); updateStage(); }));
document.querySelectorAll("[data-result]").forEach(button => button.addEventListener("click", () => { result = button.dataset.result; updateResult(); }));
let preferred = new URLSearchParams(location.search).get("lang");
try { preferred ||= localStorage.getItem("elias-language"); } catch { /* No external storage. */ }
setLanguage(preferred);
