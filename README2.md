# 更新分支指南

假設當技術長或組長在`global.scss`或其他公共檔案上進行更新，並推送到GitHub專案的`main`分支時，請按照以下步驟更新你的分支以包含這些最新的更改。

## 步驟 1: 版控你的分支專案

確保你的分支專案已經進行了版控。

## 步驟 2: 切換分支並拉取最新的`main`分支

首先，切換回`main`分支並同步GitHub上的最新更改到你的本地`main`分支。

```bash
# 切換到 main 分支
git checkout main

# 從 GitHub 拉取最新的 main 分支
git pull origin main

```
## 步驟 3: 切換回你的分支

切換回你自己的分支以進行開發。

```bash
git checkout 你的名字

```

## 步驟 4: 合併main分支到你的分支

最後，合併main分支到你的分支，這樣你就可以在你的分支中看到最新的更改了。

```bash
git merge --no-ff -m "合併 main 到 你的名字" main

```
