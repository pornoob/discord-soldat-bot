export default {
  triggers: ["!maps"],
  context: {},
  lines: [
    "Map List:",
    "ctf_Aftermath, ctf_Amnesia, ctf_Arabic, ctf_Ash, ctf_B2b",
    "ctf_Blade, ctf_Campeche, ctf_Catch, ctf_Cobra, ctf_Crucifix",
    "ctf_Death, ctf_Division, ctf_Dropwdown, ctf_Equinox, ctf_Guardian",
    "ctf_Hormone, ctf_Horror, ctf_IceBeam, ctf_Lanubya, ctf_Laos",
    "ctf_Lava, ctf_Maya, ctf_Mayapan, Mine, ctf_MFM",
    "ctf_Nuubia, ctf_Paradigm, ctf_Pod, ctf_Raspberry, ctf_Razer",
    "ctf_Rotten, ctf_Ruins, ctf_Scorpion, ctf_Snakebite, ctf_Spark",
    "ctf_Steel, ctf_Triumph, ctf_Viet, ctf_Voland, ctf_Wretch, ctf_X",
  ],
  execute(nickname, args) {
    this.lines.forEach(line => { this.context.client.write(`/SAY ${line}\r\n`); });
  }
};
