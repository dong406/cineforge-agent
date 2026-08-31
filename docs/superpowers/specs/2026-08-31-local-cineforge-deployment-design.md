# CineForge Agent 本地部署设计

## 目标

在 Windows 的 Docker Desktop 环境中运行当前工作区的 CineForge Agent 源码版本，确保访问仅限本机，并保留项目运行数据。

## 方案

- 使用 Docker Compose 从仓库根目录构建本地镜像 `cineforge-agent:local`，不拉取上游 ArcReel 镜像。
- 使用未跟踪的 `deploy/docker-compose.local.yml` 覆盖部署设置，将端口发布为 `127.0.0.1:1241:1241`。
- 从 `.env.example` 创建 `deploy/.env`，为管理登录与令牌写入随机强凭据；`.env` 不提交到 Git。
- 继续使用现有命名卷映射目录：`projects`、`logs`、`vertex_keys`、`claude_data`。

## 验证

1. Docker Compose 服务状态为 running。
2. `http://127.0.0.1:1241/health` 返回成功。
3. 容器端口仅绑定到 `127.0.0.1`。

## 运行与停止

在 `deploy` 目录执行：

```powershell
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
docker compose -f docker-compose.yml -f docker-compose.local.yml down
```
