// carbon-data.js
const carbonData = {
  quizzes: {
    m1: {
      title: "Quiz: Versatile Nature of Carbon",
      questions: [
        {
          q: "What is the valency of carbon?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Carbon has 4 valence electrons, hence it is tetravalent."
        },
        {
          q: "The property of carbon atoms to form long chains is called:",
          options: ["Isomerism", "Catenation", "Allotropy", "Tetravalency"],
          answer: 1,
          explanation: "Catenation is the unique ability of carbon to form bonds with other carbon atoms, giving rise to large molecules."
        }
      ]
    },
    m2: {
      title: "Quiz: Electron Dot Structures",
      questions: [
        {
          q: "How many pairs of electrons are shared in an oxygen (O₂) molecule?",
          options: ["1", "2", "3", "4"],
          answer: 1,
          explanation: "Oxygen forms a double bond, meaning 2 pairs (4 electrons) are shared."
        },
        {
          q: "Which of the following molecules has a triple bond?",
          options: ["H₂", "O₂", "N₂", "CH₄"],
          answer: 2,
          explanation: "Nitrogen (N₂) forms a triple bond sharing 3 pairs of electrons."
        }
      ]
    },
    m3: {
      title: "Quiz: Hydrocarbons",
      questions: [
        {
          q: "What is the general formula for alkynes?",
          options: ["CnH2n+2", "CnH2n", "CnH2n-2", "CnHn"],
          answer: 2,
          explanation: "Alkynes have at least one triple bond, following the formula CnH2n-2."
        },
        {
          q: "Ethene is an example of an:",
          options: ["Alkane", "Unsaturated hydrocarbon", "Alkyne", "Aromatic compound"],
          answer: 1,
          explanation: "Ethene has a double bond, making it an unsaturated hydrocarbon."
        }
      ]
    },
    m4: {
      title: "Quiz: Chemical Properties",
      questions: [
        {
          q: "Which reaction is typically shown by saturated hydrocarbons in the presence of sunlight?",
          options: ["Addition", "Substitution", "Combustion", "Esterification"],
          answer: 1,
          explanation: "Saturated hydrocarbons undergo substitution reactions, e.g., with chlorine in sunlight."
        },
        {
          q: "The reaction of an acid with an alcohol to form a sweet-smelling substance is called:",
          options: ["Saponification", "Esterification", "Oxidation", "Addition"],
          answer: 1,
          explanation: "Esterification produces esters, which are sweet-smelling substances used in perfumes."
        }
      ]
    },
    m5: {
      title: "Quiz: Cleansing Action of Soap",
      questions: [
        {
          q: "Which part of the soap molecule is hydrophobic (water-repelling)?",
          options: ["The ionic head", "The long hydrocarbon tail", "Both", "Neither"],
          answer: 1,
          explanation: "The long hydrocarbon tail is hydrophobic and dissolves in dirt/oil, while the ionic head is hydrophilic."
        },
        {
          q: "What is the cluster of soap molecules trapping dirt called?",
          options: ["Molecule", "Polymer", "Micelle", "Colloid"],
          answer: 2,
          explanation: "A micelle forms when the hydrophobic tails attach to dirt and the hydrophilic heads face the water."
        }
      ]
    }
  },



  reactions: {
    combustion: {
      eq: "<span class='reactants'>CH₄ + 2O₂</span> <span class='arrow'>→</span> <span class='products'>CO₂ + 2H₂O + Heat & Light</span>",
      animHtml: "<div style='font-size: 3rem; text-align:center;'>🔥💡</div><p style='text-align:center; color:#aaa'>Methane burning cleanly with oxygen.</p>"
    },
    oxidation: {
      eq: "<span class='reactants'>CH₃-CH₂OH</span> <span class='arrow'>→</span> <span class='products'>CH₃COOH</span><span class='condition'>Alk. KMnO₄ + Heat</span>",
      animHtml: "<div style='font-size: 3rem; text-align:center;'>🍷 ➔ 🧪</div><p style='text-align:center; color:#aaa'>Ethanol oxidising to Ethanoic Acid.</p>"
    },
    addition: {
      eq: "<span class='reactants'>C₂H₄ + H₂</span> <span class='arrow'>→</span> <span class='products'>C₂H₆</span><span class='condition'>Ni catalyst</span>",
      animHtml: "<div style='font-size: 3rem; text-align:center;'>= ➔ -</div><p style='text-align:center; color:#aaa'>Double bond breaking to add Hydrogen (Hydrogenation).</p>"
    },
    substitution: {
      eq: "<span class='reactants'>CH₄ + Cl₂</span> <span class='arrow'>→</span> <span class='products'>CH₃Cl + HCl</span><span class='condition'>Sunlight</span>",
      animHtml: "<div style='font-size: 3rem; text-align:center;'>☀️</div><p style='text-align:center; color:#aaa'>Chlorine replacing Hydrogen in presence of sunlight.</p>"
    },
    esterification: {
      eq: "<span class='reactants'>CH₃COOH + C₂H₅OH</span> <span class='arrow'>⇌</span> <span class='products'>CH₃COOC₂H₅ + H₂O</span><span class='condition'>Acid Catalyst</span>",
      animHtml: "<div style='font-size: 3rem; text-align:center;'>🍓👃</div><p style='text-align:center; color:#aaa'>Formation of sweet-smelling ester (Ethyl ethanoate).</p>"
    }
  }
};
