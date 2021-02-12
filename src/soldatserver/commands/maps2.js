export default {
  triggers: ["!maps2"],
  context: {},
  lines: [
    "Alternative Map List:",
    "ctf_Aggressor, ctf_Amazonas, ctf_Amush, ctf_AutumnRush, ctf_Boots",
    "ctf_Cleash, ctf_Coldshiver, ctf_Complex, ctf_Craven, ctf_Desert",
    "ctf_Fracture, ctf_Harlequin, ctf_Hive, ctf_OldLanubya, ctf_RL",
    "ctf_Tv, ctf_Virmoenia",
  ],
  execute(nickname, args) {
      this.lines.forEach(line => { this.context.client.write(`/SAY ${line}\r\n`); });
  }
}
