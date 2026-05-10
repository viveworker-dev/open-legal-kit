# AIコーディングエージェント向けプロンプト

Codex、Claude、Cursor、Devin などのAIコーディングエージェントに貼り付けて使うプロンプトです。

```text
open-legal-kit を使って、このアプリ向けのリーガル衛生ページを生成してください。

やってほしいこと:
1. このコードベースを調査する。
2. open-legal-kit 用の `legal.config.json` を作成する。
3. config check を実行する。
4. Markdown と HTML のページを `docs/legal` に生成する。
5. 推定した内容と、人間が確認すべき未確定事項を要約する。

できる限り正確に推定してください:
- アプリ名と公開URL
- 運営者名と連絡先のプレースホルダー
- 明らかであれば提供地域
- アカウント機能の有無
- 収集しているユーザーデータ
- Analytics / Cookie / local storage の利用有無
- AI API の利用有無とプロバイダー
- プロンプト、出力、ファイル、メッセージ、ユーザーコンテンツを保存しているか
- ファイルアップロード機能の有無
- 決済、サブスクリプション、無料トライアル、返金、利用上限、クォータの有無
- モバイルアプリかどうか
- プッシュ通知、端末権限、クラッシュレポートの利用有無
- 子ども向けに見えるか
- 健康、金融、雇用、生体情報、正確な位置情報、規制対象データなどセンシティブ領域に触れていないか

実行するコマンド:

npx open-legal-kit@latest check --config ./legal.config.json
npx open-legal-kit@latest generate --config ./legal.config.json --out ./docs/legal

このリポジトリ内に open-legal-kit のローカルcheckoutがある場合は、ローカルCLIを使ってもよいです。

node ./bin/open-legal-kit.mjs check --config ./legal.config.json
node ./bin/open-legal-kit.mjs generate --config ./legal.config.json --out ./docs/legal

ルール:
- 不確かな事実を創作しない。
- 運営者名や連絡先がリポジトリにない場合は、明確なプレースホルダーにする。
- 不明点は `custom_notes` に追加する。
- 高リスク領域が見つかった場合は、最終要約で目立つように残す。
- 既存のリーガルページは、指示がない限り削除しない。
- 生成された文書はドラフトであり、法務アドバイスやコンプライアンス保証ではない。

生成後に教えてください:
- 作成したファイル
- 推定したデータフロー
- プレースホルダーになっている項目
- 公開前に人間が確認すべきこと
```
