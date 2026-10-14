# ELIAS

**Region and Endpoint Grounding for Bilingual Navigation Instruction Annotation**

[Project page](https://tangyipeng100.github.io/elias-navigation-annotation/) · [中文版](README.zh.md)

## Coming soon

The paper has **not yet been accepted**. This repository currently contains only the public project-page source and selected presentation assets. The research implementation and reproduction guide will be organized for release after acceptance. No acceptance, publication venue, or release date is claimed.

The paper itself is not available for download here yet. Do not treat this repository as a released implementation or reproduce experiments from this showcase.

## Research preview

ELIAS (Evidence-Locked Instruction Annotation System) grounds scene regions, route actions, and endpoint semantics before producing Chinese–English navigation instructions:

1. Region inference, conditioned on a scene-level naming prior.
2. Open terminal observation, before canonical retrieval and without prior injection.
3. Deterministic local canonical-name retrieval.
4. Separate forward and place anchors for endpoint grounding.
5. Structured bilingual generation with an explicit terminal-clause constraint.
6. A consistency gate for accept, review, or abstain.

The workbench supports evidence inspection and correction. Grounded evidence constrains later generation; “evidence locked” does not mean an immutable final-sentence overwrite.

## Preliminary model-based evidence

The frozen test includes 40 sample groups and 120 candidates: 20 rendered indoor trajectories × four methods, 10 robot-recorded complete trajectories × two methods, and 10 robot-recorded region tasks × two methods. Pilot samples are excluded.

An independent, method-blind GPT-5.5 model evaluator judges the candidates. On rendered complete trajectories, critical errors change from 19/20 (95%) for single-pass generation to 5/20 (25%) for the full pipeline, while usable outputs change from 1/20 (5%) to 15/20 (75%). On robot-recorded complete trajectories, the rates change from 10/10 (100%) to 2/10 (20%) and from 0/10 (0%) to 8/10 (80%).

These are model judgments—not human gold labels or navigation success rates. The experiment covers one building system and a small sample. No downstream navigation gains, human time savings, or multi-rater agreement are established. Component effects remain preliminary.

## Authors

Yipeng Tang†, Haoge Jiang†, Qiancheng Ye, Zijian Tang, Zhixing Song, Chaochao He, Zhenyu Xu, Jinfei Gao, Baoping Cheng, Ting Huang, Qiran Pu*.

China Mobile (Hangzhou) Information Technology Co., Ltd., Hangzhou, Zhejiang 311100, China.

† Yipeng Tang and Haoge Jiang contributed equally. * Qiran Pu is the corresponding author.

Contact: [puqiran@cmhi.chinamobile.com](mailto:puqiran@cmhi.chinamobile.com).

## Page source and release boundary

`docs/` is a buildless HTML/CSS/JavaScript project page served by GitHub Pages from `main:/docs`. It uses browser-local language preferences and has no analytics, backend, account system, or model API calls.

This repository intentionally does **not** contain research-pipeline source, frozen candidates or scores, raw videos, prompt archives, model responses, request ledgers, credentials, or operational logs. Selected figures are documented in [ASSETS.md](ASSETS.md). A code/data licensing decision will be added with the actual release; no research-code license is implied by the current placeholder.

For a local preview, serve the `docs/` directory with any static HTTP server. The page supports English and Chinese, mobile layouts, stage explanations, and trajectory-set result switching.

See [RELEASE_PLAN.md](RELEASE_PLAN.md) for the acceptance-dependent release plan. A formal paper citation will be added when publication details are confirmed.
