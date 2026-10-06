import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const aliases = [
  "architect",
  "arena",
  "automate-me",
  "benchmark-checklist",
  "blast-radius",
  "bro",
  "correct",
  "create-skill",
  "create-verification-skill",
  "figure-it-out",
  "how",
  "interrogate",
  "maintain-verification-skill",
  "make-bot-ui",
  "no-comments",
  "poteto-help",
  "poteto-mode",
  "recall",
  "reflect",
  "setup-pstack",
  "show-me-your-work",
  "swarm",
  "tdd",
  "teach",
  "technical-writing",
  "unslop",
  "why",
] as const;

export default function pstackAliases(pi: ExtensionAPI) {
  for (const name of aliases) {
    pi.registerCommand(name, {
      description: `Run the pstack ${name} skill`,
      handler: async (args, ctx) => {
        if (!ctx.isIdle()) {
          ctx.ui.notify(`Wait for the current turn before running /${name}.`, "warning");
          return;
        }

        const invocation = `/skill:${name}${args.trim() ? ` ${args.trim()}` : ""}`;
        pi.sendUserMessage(invocation, { expandPromptTemplates: true });
      },
    });
  }
}
