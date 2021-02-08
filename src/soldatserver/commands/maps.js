export default {
  lists: [
    [
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
    [
      "Alternative Map List:",
      "ctf_Aggressor, ctf_Amazonas, ctf_Amush, ctf_AutumnRush, ctf_Boots",
      "ctf_Cleash, ctf_Coldshiver, ctf_Complex, ctf_Craven, ctf_Desert",
      "ctf_Fracture, ctf_Harlequin, ctf_Hive, ctf_OldLanubya, ctf_RL",
      "ctf_Tv, ctf_Virmoenia",
    ]
  ],
  maps(client, idx) {
    this.lists[idx].forEach(line => { client.write(`/SAY ${line}\r\n`); });
  }
};
