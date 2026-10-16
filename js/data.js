/*
  Candidatos do processo seletivo do clube SKEM.AI.
  Fonte: transcrições e atas das entrevistas (pasta "Transcrições Clube de IA").
  Notas: de 0 a 10 em cada critério do clube, atribuídas por IA a partir do que foi dito
  em cada entrevista. Total = soma dos três critérios convertida para 0 a 100.

  Para ajustar algo, edite este arquivo: scores (notas), why (justificativa de cada nota),
  summary (resumo) e attention (pontos de atenção).
*/
window.CRITERIA = [
  { key: "pro",      label: "Pró-atividade",       short: "Pró" },
  { key: "learn",    label: "Vontade de aprender", short: "Apr" },
  { key: "interest", label: "Interesse verdadeiro", short: "Int" }
];

window.CANDIDATES = [
  {
    id: "andre", name: "André", gender: "M",
    stage: "3º semestre",
    tagline: "Faz competições e já cursou computação",
    look: { hair: "short", hairColor: "#17171F", outfit: "#6015F5", glasses: false, prop: "racket" },
    src: ["Entrevista André parte 1, 2 e 3 (áudio transcrito)"],
    resume: {
      perfil: ["Está no 3º semestre. Cursou computação antes de vir para a SKEMA e não gostou.", "Participa de competições desde antes da faculdade."],
      atividades: ["Empresa Júnior, na área de projetos, há mais de 6 meses", "Entrou agora na Hope", "Joga tênis"],
      ia: ["Usa mais o Claude no chat e, às vezes, o GPT", "Faz apresentações e usos gerais; não usa Claude Code nem automações"],
      disp: "Quarta e sexta à tarde sem problema. Quarta à noite é difícil. Viagem de mobilidade só no meio do ano que vem."
    },
    scores: { pro: 7.5, learn: 8.0, interest: 7.5 },
    why: {
      pro: "Está na Júnior há mais de 6 meses, entrou na Hope e já se inscreveu no curso de machine learning.",
      learn: "Quer sair do uso básico, que chama de senso comum, e estudar assuntos mais profundos de IA.",
      interest: "Interesse claro, mas sem uma frente definida: ainda não sabe se prefere teoria ou prática."
    },
    summary: [
      "Usa IA hoje de forma básica (Claude no chat, apresentações) e quer aprender assuntos mais profundos.",
      "Já está em Júnior e Hope, com rotina organizada; se descreve como calmo, um pouco ansioso, e diz lidar bem com compromissos.",
      "Confortável em explicar ideias e participar de um clube de estudos.",
      "Quase não tem contatos na área de IA."
    ],
    attention: ["Quarta à noite é difícil", "Contatos na área: quase nenhum"]
  },
  {
    id: "antonio", name: "Antonio Neto", gender: "M",
    stage: "Entrou na faculdade este ano",
    tagline: "Quer aprender e ensinar IA",
    look: { hair: "curly", hairColor: "#17171F", outfit: "#8E5CFF", glasses: false, prop: "megaphone" },
    src: ["Transcrição entrevista Antonio Neto (TurboScribe)"],
    resume: {
      perfil: ["Entrou na faculdade este ano e foi aí que viu o que a IA consegue fazer.", "Veio de formação técnica (Cotemig), onde viu várias linguagens sem se aprofundar."],
      atividades: ["Empresa Júnior", "Usa IA nas aulas e trabalhos", "Pretende fazer mobilidade"],
      ia: ["Sabe HTML, CSS e um pouco de banco de dados", "Está estudando Python", "Quer aprender automação e machine learning"],
      disp: "Disponível quase todos os dias depois da aula, inclusive quartas à tarde. Só fica limitado nos dias de aula à tarde."
    },
    scores: { pro: 7.5, learn: 8.5, interest: 8.5 },
    why: {
      pro: "Participa da Júnior, usa IA nas tarefas por conta própria e quer ensinar o que aprender.",
      learn: "Estuda Python agora, se inscreveu no curso de machine learning e aprende 100% praticando.",
      interest: "Quer aprender e também ensinar IA, e prefere o grupo de estudo à comissão organizadora."
    },
    summary: [
      "Motivação clara: expandir o conhecimento em IA e ensinar outras pessoas, porque gosta de ensinar.",
      "Base técnica inicial (HTML, CSS, banco de dados) e estudando Python agora.",
      "Inscrito no curso de machine learning e com horários abertos para o grupo de estudo.",
      "Aprende melhor na prática."
    ],
    attention: ["Ainda não sabe bem o que é machine learning"]
  },
  {
    id: "arthurg", name: "Arthur Generoso", gender: "M",
    stage: "Administração, veio de Ciência da Computação",
    tagline: "Roda modelos de IA no próprio computador",
    look: { hair: "side", hairColor: "#17171F", outfit: "#26068D", glasses: true, prop: "chip" },
    src: ["Transcrição entrevista Arthur Generoso (trecho curto)"],
    resume: {
      perfil: ["Fazia Ciência da Computação e migrou para administração.", "Sente falta de uma parte técnica e viu no clube uma chance de ser mais técnico que as outras organizações."],
      atividades: ["Começando uma startup com amigos", "Faz pequenos trabalhos para o escritório de advocacia do irmão"],
      ia: ["Roda modelos locais numa placa de vídeo e testa inferência, quantização e decodificação", "Conhece banco de dados vetorial", "Usa IA no dia a dia de forma simples, mas explora a parte técnica por hobby"],
      disp: "Não foi abordada no trecho transcrito."
    },
    scores: { pro: 8.0, learn: 9.0, interest: 8.0 },
    why: {
      pro: "Tem uma startup em início e faz trabalhos paralelos para o escritório do irmão.",
      learn: "Montou o próprio ambiente para testar modelos locais e estuda inferência e quantização.",
      interest: "Escolheu o clube por ele ser mais técnico; curiosidade desde que o GPT saiu, em 2022."
    },
    summary: [
      "Perfil técnico acima da média do grupo: modelos locais, inferência, quantização, banco vetorial.",
      "Curiosidade por IA desde 2022; experimenta com projetos e jogos pequenos.",
      "Tem startup em estágio inicial e trabalha com o irmão, que é advogado.",
      "A transcrição é curta: horários e papel desejado no clube não aparecem."
    ],
    attention: ["Transcrição curta, sem disponibilidade", "Pode ser um bom professor interno"]
  },
  {
    id: "arthurv", name: "Arthur Valias", gender: "M",
    stage: "Estuda e estagia",
    tagline: "Quer empreender com IA em até 2 anos",
    look: { hair: "short", hairColor: "#3A1A9E", outfit: "#4A1FC9", glasses: false, prop: "truck" },
    src: ["Entrevista clube de IA Arthur Valias (PDF, lido por OCR)"],
    resume: {
      perfil: ["Estagia em pós-vendas numa empresa de tecnologia de logística, com cotação de frete e IA.", "Quer ter o próprio negócio nos próximos dois anos e vê a IA como parte disso."],
      atividades: ["Estágio presencial todos os dias", "Acabou de começar um treinamento de IA no estágio, com acesso ao Claude"],
      ia: ["Usa IA para quase tudo: e-mails, pesquisa no lugar do Google, trabalhos da faculdade", "Faz apresentações no Gamma e no Claude", "Sente que ainda extrai pouco das ferramentas"],
      disp: "Estágio das 13h às 19h todos os dias. Só consegue vir às quintas depois das 18h e quer sair do estágio no ano que vem. Pediu aula gravada ou material."
    },
    scores: { pro: 8.5, learn: 8.5, interest: 9.0 },
    why: {
      pro: "Já aplica IA no trabalho e nos estudos, pensa em empreender e disse que fará o que for preciso pelo grupo.",
      learn: "Quer extrair mais da IA, começou treinamento no estágio e propõe aprender por material gravado.",
      interest: "Liga o clube a um objetivo concreto de carreira e perguntou como o clube vai funcionar na prática."
    },
    summary: [
      "Usa IA em quase tudo e percebe que ainda aproveita pouco; quer dominar a ferramenta.",
      "Objetivo claro: abrir um negócio em até dois anos e ganhar velocidade com IA.",
      "Perguntou sobre liderança, objetivo do clube e se haverá aulas ou projetos práticos.",
      "Disse que o horário é o difícil: a rotina de estágio impede as aulas da tarde neste semestre."
    ],
    attention: ["Não consegue a reunião semanal à tarde neste semestre", "Pediu aula gravada ou material"]
  },
  {
    id: "bia", name: "Bia Bragança", gender: "F",
    stage: "6º semestre",
    tagline: "Monitora de Estatística, ama dados",
    look: { hair: "long", hairColor: "#17171F", outfit: "#A98BFF", glasses: false, prop: "chart" },
    src: ["Ata de entrevista Bia Bragança"],
    resume: {
      perfil: ["6º semestre. Foi monitora de Estatística e diz ter facilidade com exatas.", "Percebeu que precisava aprender IA quando começou a trabalhar e se sentiu atrás de colegas que já usavam."],
      atividades: ["Consultoria Júnior, Atlética e outra associação", "Estágio à tarde e balé à noite"],
      ia: ["Faz análises básicas no trabalho e trata dados faltantes em planilhas", "Cria resumos e simulados para estudar", "Interesse maior em análise de dados com IA"],
      disp: "Faculdade de manhã, estágio à tarde, balé à noite. Noites ficam livres depois de 31/10. Manhã ou noite funcionam."
    },
    scores: { pro: 8.0, learn: 8.5, interest: 8.5 },
    why: {
      pro: "Passou por várias associações, trabalha e estuda, e já se inscreveu no curso de machine learning.",
      learn: "Aprende fazendo, elogiou a aula prática com o Yuri e quer transformar um uso pontual em estruturado.",
      interest: "Motivação prática e concreta: aplicar IA no trabalho, nos estudos e no dia a dia."
    },
    summary: [
      "Quer aprender IA para ganhar eficiência no trabalho e nos estudos.",
      "Já usa IA em análises, planilhas e simulados; tem interesse especial em análise de dados.",
      "Aprende melhor na prática; gostou da aula prática com o professor Yuri.",
      "Sem base formal em programação, mas confiante em aprender."
    ],
    attention: ["Noites só livres depois de 31/10", "Rotina cheia: aula, estágio e balé"]
  },
  {
    id: "catarina", name: "Catarina Fernandes", gender: "F",
    stage: "2º período",
    tagline: "Lidera projetos na Consultoria Júnior e quer aprender IA do zero",
    look: { hair: "pony", hairColor: "#3A1A9E", outfit: "#6015F5", glasses: false, prop: "clipboard" },
    src: ["Ata de Entrevista - Processo Seletivo SKEM.AI - Catarina Fernandes (PDF)"],
    resume: {
      perfil: ["2º período. Atua como diretora/head de projetos na Consultoria Júnior.", "Valoriza as ligas porque aprende com a prática e com a troca entre os membros.", "Aprende melhor estudando sozinha, depois de uma orientação inicial."],
      atividades: ["Diretora/head de projetos na Consultoria Júnior"],
      ia: ["Não se considera familiarizada com IA e quer aprender desde os fundamentos", "Quer aprender a escrever bons prompts e entender como a IA funciona", "Vê tarefas da Júnior que ficariam mais rápidas com IA, mas entende a IA como apoio e não como solução isolada"],
      disp: "Tardes de quarta e sexta livres, os dias previstos para o clube. Consegue conciliar com a Júnior e topa compartilhar conhecimento."
    },
    scores: { pro: 8.5, learn: 8.5, interest: 8.0 },
    why: {
      pro: "Lidera projetos na Júnior, procura ajuda quando não sabe e quer aplicar o que aprender no trabalho.",
      learn: "Reconhece com honestidade o próprio nível e quer entender os fundamentos, não só usar a ferramenta.",
      interest: "Motivação clara e ligada à carreira e à Júnior, mas sem uma área de IA específica ainda."
    },
    summary: [
      "Entra para aprender IA desde a base, sabendo que a tecnologia é ferramenta de apoio ao trabalho.",
      "Tem experiência de liderança e gestão de projetos na Consultoria Júnior e quer aplicá-la com IA.",
      "Aprende melhor sozinha depois de uma explicação inicial, e busca ajuda de quem sabe mais.",
      "Topa compartilhar o que aprende e tem as tardes de quarta e sexta livres."
    ],
    attention: ["Sem experiência prévia em IA", "Ainda sem uma área de IA de preferência"]
  },
  {
    id: "rebecca", name: "Rebecca", gender: "F",
    stage: "2º período",
    tagline: "Entrou para aprender e aprende fazendo",
    look: { hair: "bun", hairColor: "#17171F", outfit: "#C9B6FF", glasses: false, prop: "palette" },
    src: ["Entrevista Rebecca (áudio transcrito; o arquivo estava nomeado como Catarina)"],
    resume: {
      perfil: ["2º período. Entrou na Consultoria Júnior no semestre passado, em Projetos, e já passou pelo RH.", "Foi convidada pela Karina e disse que não sabe nada de IA, mas quer entrar para aprender.", "É visual: só ouvindo não pega bem, estuda sozinha e aprende fazendo. Demora um pouco mais para assimilar."],
      atividades: ["Consultoria Júnior, em projetos", "Hope"],
      ia: ["Usa Claude e ChatGPT no básico", "Conhece pouco de prompt e não usa outras ferramentas"],
      disp: "Júnior tem reuniões ao meio-dia e às 10h de quarta, mas diz que dá um jeito. Tem aula na sexta, não tem na segunda."
    },
    scores: { pro: 7.5, learn: 8.5, interest: 7.5 },
    why: {
      pro: "Atua em projetos na Júnior e está em duas organizações; pediu lembretes porque às vezes atrasa.",
      learn: "Sabe como aprende melhor (vendo e fazendo) e quer entrar justamente para aprender do zero.",
      interest: "Acha o tema muito importante e quer aprender, mas sem um tema específico e sem conhecer ninguém da área."
    },
    summary: [
      "Entrou no clube para aprender do zero; foi incentivada pela Karina a tentar mesmo sem saber nada.",
      "Aprende vendo e fazendo; precisa estudar sozinha o que não entende só ouvindo.",
      "Atua na Júnior e na Hope e acredita lidar bem com os horários.",
      "Se descreve como organizada, com um leve problema de atraso e esquecimento, e pede lembretes."
    ],
    attention: ["Sem experiência prévia em IA", "Pediu lembretes para horários", "Reuniões da Júnior ao meio-dia e às 10h de quarta"]
  },
  {
    id: "felipe", name: "Felipe", gender: "M",
    stage: "4º período",
    tagline: "Automatizou o próprio trabalho com Claude Code",
    look: { hair: "side", hairColor: "#17171F", outfit: "#6015F5", glasses: false, prop: "terminal" },
    src: ["Entrevista Felipe 4 período (áudio transcrito)"],
    resume: {
      perfil: ["4º período, na SKEMA desde 2025.", "Foi do RH e depois vice-presidente da empresa Júnior."],
      atividades: ["Estágio na Vale, remoto, em remuneração e mobilidade global", "Estágio financeiro anterior em uma empresa de telas para motoristas de aplicativo"],
      ia: ["Usa Claude Code no VS Code", "Automatizou faturas, notas fiscais e conciliação no estágio financeiro", "Usa skills e memória; aprendeu por vídeos no YouTube"],
      disp: "Quintas ao meio-dia funcionam bem. Tem dificuldade com horários muito cedo."
    },
    scores: { pro: 9.5, learn: 9.0, interest: 8.5 },
    why: {
      pro: "Viu que o trabalho era repetitivo e automatizou por conta própria; já foi vice-presidente da Júnior.",
      learn: "Aprendeu Claude Code, skills e memória sozinho, por vídeos, e quer evoluir.",
      interest: "Vê a IA como diferencial de carreira e pretende levá-la ao novo estágio."
    },
    summary: [
      "Usa Claude Code de verdade no trabalho: automatizou faturas, nota fiscal e conciliação.",
      "Experiência de liderança como vice-presidente da Júnior.",
      "Aprende com uma introdução e depois prática; gosta de trabalho em grupo.",
      "Se compromete até o fim quando está engajado."
    ],
    attention: ["Dificuldade com horários cedo", "Contatos na área só dentro da faculdade"]
  },
  {
    id: "gabi", name: "Gabi Micelli", gender: "F",
    stage: "2º período",
    tagline: "Fala vários idiomas e quer automatizar com n8n",
    look: { hair: "pony", hairColor: "#3A1A9E", outfit: "#8E5CFF", glasses: false, prop: "globe" },
    src: ["Transcrição entrevista Gabi Micelli", "Entrevista Gabi segundo período (áudio transcrito)"],
    resume: {
      perfil: ["Fez curso técnico de administração no Sebrae e estagiou como SDR, qualificando leads.", "Fluente em inglês, espanhol intermediário-avançado e estuda mandarim."],
      atividades: ["Hope, Consultoria Júnior (head comercial), SEC (marketing) e equipe de marketing de outra associação", "Sai da Júnior no próximo semestre"],
      ia: ["Já usou Claude, ChatGPT e Gemini, mas pouco", "Quer aprender prompts melhores e automação; admira o n8n que a Júnior usa para disparo de mensagens"],
      disp: "Ajusta a rotina para encaixar o clube: tarde é tranquila, noite também com adaptação."
    },
    scores: { pro: 9.5, learn: 8.5, interest: 8.5 },
    why: {
      pro: "Está em quatro organizações, lidera um time comercial e se oferece para trazer contatos técnicos.",
      learn: "Tentou Scratch, faz curso de algoritmo e quer pessoas boas por perto para se orientar.",
      interest: "Acha que a IA muda tudo em um ano e traz uma dor concreta: automatizar mensagens."
    },
    summary: [
      "Perfil de liderança e comunicação, com experiência comercial e em várias associações.",
      "Assume que sabe pouco de IA e quer aprender na prática, especialmente automação.",
      "Tem contatos úteis: colega de ciência de dados, irmão em engenharia da computação.",
      "Perguntou sobre a estrutura e a gestão do clube, mostrando engajamento."
    ],
    attention: ["Muitas frentes ao mesmo tempo", "Libera tempo ao sair da Júnior"]
  },
  {
    id: "gadheer", name: "Gadheer", gender: "M",
    stage: "Global BBA",
    tagline: "Fez curso de IA com certificado",
    look: { hair: "buzz", hairColor: "#17171F", outfit: "#26068D", glasses: false, prop: "ball" },
    src: ["Entrevista Gadheer (áudio transcrito, em inglês)"],
    resume: {
      perfil: ["Aluno do Global BBA. Acha que a IA vai ter efeito grande no futuro dele e quer unir IA e negócios.", "Gosta de futebol e de YouTube."],
      atividades: ["Candidatou-se a dois clubes: este e a Hope (voluntariado)", "Fez um curso online de IA, de 12 aulas, com prova e certificado"],
      ia: ["Usa IA quase todo dia para estudar: quizzes e resumos", "Depois do curso, entendeu que cada ferramenta tem uma função", "Ainda não usa de forma avançada"],
      disp: "Livre todas as tardes. Só tem cálculo na sexta, das 13h às 17h."
    },
    scores: { pro: 7.0, learn: 8.5, interest: 8.0 },
    why: {
      pro: "Buscou um curso de IA por conta própria e quer ser membro produtivo, mas não trouxe propostas concretas.",
      learn: "Terminou um curso com exames, usa IA todo dia para estudar e quer aprofundar.",
      interest: "Escolheu poucos clubes, com foco em IA, e liga o tema direto ao futuro em negócios."
    },
    summary: [
      "Concluiu curso de IA com certificado e usa a ferramenta diariamente nos estudos.",
      "Quer combinar IA com a formação em negócios.",
      "Tem a agenda livre à tarde e topa compartilhar conhecimento, mas ainda não sabe o que levar.",
      "Gostou da ideia do clube de estudos."
    ],
    attention: ["Cálculo na sexta, das 13h às 17h", "Entrevista feita em inglês"]
  },
  {
    id: "ian", name: "Ian Borgstrom", gender: "M",
    stage: "Estudante da SKEMA BH",
    tagline: "Está criando um sistema de gestão com IA",
    look: { hair: "curly", hairColor: "#3A1A9E", outfit: "#6015F5", glasses: true, prop: "robot" },
    src: ["Ata de entrevista Ian Borgstrom"],
    resume: {
      perfil: ["Considera a IA um diferencial profissional.", "Reconhece que parou de acompanhar as novidades e quer voltar."],
      atividades: ["Desenvolve, com alguém mais técnico, um sistema de gestão para a empresa do pai"],
      ia: ["ChatGPT para pesquisa; Claude para programação, apresentações e provas", "Programa com apoio de IA, sem dominar todo o código", "Quer aprender automação e agentes"],
      disp: "Rotina flexível: qualquer horário depois das aulas, de manhã ou à noite."
    },
    scores: { pro: 8.0, learn: 8.5, interest: 8.0 },
    why: {
      pro: "Está construindo um sistema real para a empresa da família em vez de só estudar o tema.",
      learn: "Aprende testando, quer entrar em programação, automação e agentes e admite o que ainda não sabe.",
      interest: "Quer estar perto de pessoas curiosas para se manter atualizado."
    },
    summary: [
      "Já tem projeto prático: sistema de gestão para a empresa do pai, com apoio de IA.",
      "Aprende fazendo; quer evoluir em programação, automação e criação de agentes.",
      "Reconhece o próprio nível com realismo e a necessidade de se atualizar.",
      "Horários flexíveis."
    ],
    attention: ["Parou de acompanhar as novidades da área"]
  },
  {
    id: "laura", name: "Laura Ataíde", gender: "F",
    stage: "Marketing",
    tagline: "Quer usar IA para ajudar a empresa da família",
    look: { hair: "long", hairColor: "#B9A2FF", outfit: "#26068D", glasses: false, prop: "bag" },
    src: ["Entrevista Laura Ataíde (PDF, lido por OCR)"],
    resume: {
      perfil: ["Interessa-se por marketing; já pensou em comércio exterior.", "A mãe cuida do conteúdo da empresa da família sem experiência em marketing, e isso motiva Laura a aprender."],
      atividades: ["Empresa Júnior e outras associações"],
      ia: ["Usa ChatGPT e Claude, às vezes Gemini, de forma básica", "Faz pesquisas e documentos e está testando imagens", "Quer otimizar processos e produção de conteúdo"],
      disp: "Quarta ao meio-dia é o pior horário por causa da Júnior; fora isso é flexível e consegue uma tarde por semana."
    },
    scores: { pro: 8.0, learn: 8.0, interest: 8.5 },
    why: {
      pro: "Diz que se oferece para ajudar sem esperar ser chamada e participa da Júnior e de outras associações.",
      learn: "Aprende fazendo, busca constância e perguntou se ainda podia entrar no curso de machine learning.",
      interest: "Tem uma motivação pessoal forte e específica: ajudar a empresa e a mãe com marketing."
    },
    summary: [
      "Motivação principal é ajudar o crescimento da família, automatizando conteúdo e processos.",
      "Uso atual de IA é básico; quer aprender a automatizar posts e outras tarefas.",
      "Aprende vendo e depois fazendo.",
      "Gostou da ideia de postar automaticamente no Instagram e se interessou por machine learning."
    ],
    attention: ["Quarta ao meio-dia não funciona", "Admite que constância é um ponto a melhorar"]
  },
  {
    id: "marina", name: "Marina", gender: "F",
    stage: "Estudante da SKEMA BH",
    tagline: "Criou uma marca de moletons com Claude e Canva",
    look: { hair: "curly", hairColor: "#17171F", outfit: "#A98BFF", glasses: false, prop: "palette" },
    src: ["Entrevista MARINA - clube de ia (resumo gerado por IA; o texto chama a candidata de Marília)"],
    resume: {
      perfil: ["Vê a IA como área em expansão e quer entender melhor como funciona.", "Mora longe e concilia bem a rotina."],
      atividades: ["Uma organização de juventude e um clube de sustentabilidade", "Projeto de uma marca de moletons para turmas do colégio"],
      ia: ["Usa ChatGPT e Claude no dia a dia", "Criou propostas e apresentações no Claude e finalizou o design no Canva", "Quer aproveitar melhor as versões gratuitas"],
      disp: "Rotina flexível e pouca demanda semanal nas outras atividades."
    },
    scores: { pro: 8.0, learn: 8.0, interest: 8.0 },
    why: {
      pro: "Tocou um projeto próprio de moletons e participa de mais de uma atividade, mesmo morando longe.",
      learn: "Aprende melhor com aula prática e conversa; quer entender o funcionamento da IA.",
      interest: "Interessada em todas as áreas do clube e vê nele uma porta para trabalhar com IA."
    },
    summary: [
      "Interesse genuíno em IA, com foco em aplicações práticas e em otimizar projetos.",
      "Combinou Claude e Canva num projeto real de moletons para o colégio.",
      "Quer participar de projetos, marketing, aulas e palestras do clube.",
      "Boa gestão de tempo e rotina flexível."
    ],
    attention: []
  },
  {
    id: "matheusa", name: "Matheus Almeida", gender: "M",
    stage: "Estudante da SKEMA BH",
    tagline: "Curioso, ainda descobrindo qual ramo seguir",
    look: { hair: "short", hairColor: "#17171F", outfit: "#4A1FC9", glasses: false, prop: "compass" },
    src: ["Matheus Almeida (áudio transcrito)"],
    resume: {
      perfil: ["Cresceu perto de negócios; o pai e o irmão o inspiram a querer abrir o próprio negócio.", "Diz que é curioso e gosta de experimentar coisas novas."],
      atividades: ["Participa de duas ligas", "Criou uma loja e usou IA para fazer uma estampa"],
      ia: ["Usa IA para estudar, trabalhos e ideias", "O irmão tem agência de marketing que usa IA no atendimento e no conteúdo", "Inscreveu-se no curso de machine learning para ter o conhecimento"],
      disp: "Quarta à tarde ocupada, mas dá para se desdobrar. Sexta à tarde tem cálculo até as 17h. Aceita mudar a aula da noite."
    },
    scores: { pro: 6.5, learn: 7.5, interest: 6.5 },
    why: {
      pro: "Mostra disposição para resolver problemas de horário, mas trouxe poucas ações próprias com IA.",
      learn: "Busca cursos gerais e se inscreveu em machine learning, mesmo sem saber o que quer seguir.",
      interest: "Interesse real, porém amplo: diz não saber o que quer aprender com IA."
    },
    summary: [
      "Curioso e aberto a conhecer várias áreas da IA para descobrir qual ramo seguir.",
      "Uso atual é no estudo e em ideias; experiência de trabalho com IA se resume a uma estampa de camiseta.",
      "Tem contato próximo com o mundo da IA aplicada, por meio do irmão e de amigos.",
      "Horários apertados na quarta e na sexta, com disposição de reorganizar."
    ],
    attention: ["Quarta à tarde ocupada, sexta com cálculo até 17h", "Ainda sem foco definido em IA"]
  },
  {
    id: "matheusm", name: "Matheus Malafaia", gender: "M",
    stage: "6º período",
    tagline: "Usa IA todo dia para imagem, vídeo e TikTok Shop",
    look: { hair: "side", hairColor: "#17171F", outfit: "#7F57FF", glasses: false, prop: "robot" },
    src: ["Ata de Entrevista - Processo Seletivo SKEM.AI - Matheus Malafaia (PDF)"],
    resume: {
      perfil: ["6º período, com rotina mais leve e mais tempo livre agora.", "Não faz estágio em BH; trabalha com a mãe, que é arquiteta, em Lagoa Santa, e vai para lá depois das aulas. Explora TikTok Shop e criação de conteúdo no tempo livre.", "Passou a se deslocar de carro, o que facilita ficar na faculdade para atividades extras."],
      atividades: ["Já foi convidado para a Consultoria Júnior, mas não conseguiu participar por causa do deslocamento entre Várzea e a faculdade", "Passou por um grupo de Finanças; saiu por falta de clareza nas entregas e reuniões à noite"],
      ia: ["Usa IA diariamente: imagens de projetos de arquitetura, vídeos, roteiros e personagens", "Cria modelos virtuais para mostrar produtos no TikTok Shop", "Faz agentes e configurações por prompt; migrou do Gemini para o Flow", "Fez curso de full stack e projetos com CMS, mas ainda não programa IA em Python"],
      disp: "Quartas e sextas, ao meio-dia ou à tarde, compatíveis, depois das aulas. Noite era o que dificultava antes, pelo deslocamento. Segue para Lagoa Santa depois da faculdade."
    },
    scores: { pro: 7.5, learn: 9.0, interest: 8.5 },
    why: {
      pro: "Toca projetos próprios com IA (conteúdo, TikTok Shop), mas desistiu de associações anteriores por rotina e falta de clareza.",
      learn: "Quer entender os bastidores da IA, aprende na prática e já se inscreveu no curso de machine learning.",
      interest: "Usa IA com frequência e quer sair do prompt isolado para agentes, automação e integração de ferramentas."
    },
    summary: [
      "Usa IA todo dia em arquitetura, vídeo, TikTok e TikTok Shop, e quer ir além de prompts isolados.",
      "Quer aprender Python, agentes, automação e como conectar ferramentas e serviços.",
      "Aprende por tentativa e erro; a disciplina teórica de IA e machine learning não lhe rende tanto.",
      "Agora tem rotina e deslocamento mais livres para participar, e já está na lista do curso da Fisher."
    ],
    attention: ["Deslocamento: vai para Lagoa Santa depois das aulas", "Saiu de associações anteriores por rotina e horário", "Ainda não programa IA em Python"]
  },
  {
    id: "matheusr", name: "Matheus Rodrigues", gender: "M",
    stage: "5º período, Administração",
    tagline: "Quer criar agentes de IA",
    look: { hair: "side", hairColor: "#3A1A9E", outfit: "#8E5CFF", glasses: true, prop: "nodes" },
    src: ["Entrevista clube de IA, Matheus Rodrigues Bastos Aguiar (resumo gerado por IA)"],
    resume: {
      perfil: ["5º período de administração, depois de 3 períodos de Ciência da Computação.", "Critica a falta de prática na faculdade e acredita que a IA substituirá quem não dominar as ferramentas."],
      atividades: ["Procura estágio no momento", "Estágio anterior em back office de pesquisa de mercado"],
      ia: ["Usa ChatGPT, Claude e Gemini: guias de estudo, apresentações, listas de exercícios e simulados", "Quer aprender a criar agentes, melhorar prompts e automatizar processos"],
      disp: "Tarde e noite enquanto estiver sem estágio; prefere noite se voltar a estagiar. Quer ajudar a organizar o clube."
    },
    scores: { pro: 8.0, learn: 8.0, interest: 8.5 },
    why: {
      pro: "Quer entrar na estruturação do clube além de participar das aulas.",
      learn: "Tem metas claras: agentes, engenharia de prompt e automação com custo baixo.",
      interest: "Liga o clube a uma visão de mercado e a um interesse técnico de longa data."
    },
    summary: [
      "Vem de computação e quer aplicar IA de forma prática: agentes, prompts, automação.",
      "Usa vários modelos para estudar e já pensa no impacto da IA na carreira.",
      "Perdeu o prazo de inscrição do curso de machine learning por ter visto a divulgação tarde.",
      "Tem interesse em participar da organização do clube."
    ],
    attention: ["Perdeu o prazo do curso de machine learning"]
  },
  {
    id: "nagasaki", name: "Nagasaki", gender: "M",
    stage: "Veio do IBMEC (Economia)",
    tagline: "Voltou do Canadá cheio de contatos",
    look: { hair: "cap", hairColor: "#17171F", outfit: "#6015F5", glasses: false, prop: "leaf" },
    src: ["Reunião Nagasaki (áudio transcrito)"],
    resume: {
      perfil: ["Mora em BH há cerca de 10 anos e fez intercâmbio no Canadá em 2023.", "Saiu do IBMEC (Economia) por falta de identidade com o curso e prefere a SKEMA, mais prática."],
      atividades: ["Entrou na SEC há pouco, mas diz ter mais esperança neste clube", "Participou de um hackathon, onde conheceu um aluno de ciência de dados"],
      ia: ["Conhece IA generativa e ferramentas por especialidade (sites, vídeo, imagem)", "Sabe o básico de Python e programar com IA", "Quer aprender mais, principalmente programação"],
      disp: "Quartas e sextas à tarde são livres. Inscrito no curso de machine learning."
    },
    scores: { pro: 8.5, learn: 8.0, interest: 9.0 },
    why: {
      pro: "Já tem contatos para trazer ao clube e vem cobrando a diretoria sobre o andamento do processo.",
      learn: "Conhece as famílias de ferramentas de IA, programa o básico e quer aprofundar com programação.",
      interest: "Disse com todas as letras que está mais engajado aqui do que em outra associação."
    },
    summary: [
      "Engajamento declarado: prefere esta liga a outras em que acabou de entrar.",
      "Rede útil: amigo programador, aluno de ciência de dados de outra faculdade e possível palestrante da empresa onde o pai trabalha.",
      "Disponível quarta e sexta à tarde, sem problema em compartilhar conhecimento.",
      "Entende bem a diferença entre IAs conversacionais e especializadas."
    ],
    attention: ["Ainda avalia se fará mobilidade"]
  },
  {
    id: "rafael", name: "Rafael Costa", gender: "M",
    stage: "Estudante da SKEMA BH",
    tagline: "Quer ampliar seu arsenal de IAs",
    look: { hair: "short", hairColor: "#17171F", outfit: "#26068D", glasses: false, prop: "plane" },
    src: ["Rafael Costa 1 e 2 (áudio transcrito)"],
    resume: {
      perfil: ["19 anos, estudou no Marista e passou um ano e meio nos Estados Unidos.", "Escolheu a SKEMA pela mobilidade."],
      atividades: ["SEC (entrou agora)", "Aulas à tarde às segundas e quintas; nada mais fora disso neste semestre"],
      ia: ["Nunca fez nada ligado a IA além do uso básico", "Usa ChatGPT e Claude todo dia em tarefas acadêmicas", "Quer conhecer IAs de outras funções"],
      disp: "Quarta às 15h e sexta antes da aula funcionam. Se descreve como pontual e raramente falta."
    },
    scores: { pro: 6.5, learn: 7.5, interest: 6.5 },
    why: {
      pro: "Tem tempo e pontualidade, mas ainda não se inscreveu no curso de machine learning nem trouxe propostas.",
      learn: "Quer aprender vários tipos de IA e ampliar as ferramentas além de ChatGPT e Claude.",
      interest: "Motivação dividida entre aprender e os pontos de mobilidade, dos quais falou diretamente."
    },
    summary: [
      "Sem experiência anterior com IA, mas usa ChatGPT e Claude diariamente nos estudos.",
      "Disse que entrou principalmente pelo aprendizado, e também pelos pontos de mobilidade.",
      "Agenda livre, pontual, confortável em compartilhar conhecimento.",
      "Tem interesse no curso de machine learning, mas não se inscreveu."
    ],
    attention: ["Parte da motivação são os pontos de mobilidade", "Não se inscreveu no curso de machine learning"]
  },
  {
    id: "sofia", name: "Sofia Bricio", gender: "F",
    stage: "5º semestre",
    tagline: "Unifica três plataformas com IA no estágio",
    look: { hair: "side", hairColor: "#3A1A9E", outfit: "#C9B6FF", glasses: true, prop: "flow" },
    src: ["Ata de entrevista Sofia Bricio"],
    resume: {
      perfil: ["5º semestre. Cursa uma disciplina de IA e machine learning e fez cursos de Python.", "Acha o tema amplo demais e espera do clube direção e organização."],
      atividades: ["Estágio com análise de indicadores financeiros e relatórios"],
      ia: ["Unifica informações de três plataformas e monta relatórios com IA", "Cria projetos, tarefas e agentes no Claude e no ChatGPT", "Quer aprender automação e agentes autônomos"],
      disp: "Prefere a noite; um compromisso fixo toda semana pode ser difícil. Manhã das 10h ao meio-dia é possível."
    },
    scores: { pro: 8.5, learn: 9.0, interest: 8.5 },
    why: {
      pro: "Já criou agentes e projetos de IA no trabalho e perguntou sobre o planejamento do próximo semestre.",
      learn: "Fez cursos de Python, cursa disciplina de machine learning e aprende vendo demonstração e refazendo.",
      interest: "Quer orientação para transformar IA em ganho concreto, além do uso que já faz."
    },
    summary: [
      "Já aplica IA com automação e agentes no estágio, em análise de indicadores financeiros e relatórios.",
      "Quer ir além do estágio e entender como fazer a IA trabalhar de forma mais autônoma.",
      "Aprende melhor com demonstração seguida de prática; teoria longa a dispersa.",
      "Não fez o curso de machine learning por falta de tempo, não de interesse."
    ],
    attention: ["Compromisso semanal fixo pode ser difícil", "Preferência pela noite"]
  },
  {
    id: "vitor", name: "Vitor", gender: "M",
    stage: "Mais experiência de vida e trabalho",
    tagline: "Traz maturidade e visão crítica",
    look: { hair: "buzz", hairColor: "#B9A2FF", outfit: "#4A1FC9", glasses: true, prop: "briefcase" },
    src: ["Entrevista Vitor - clube de ia (resumo gerado por IA)"],
    resume: {
      perfil: ["Vê a IA como campo em crescimento e diferencial em qualquer área.", "Quer ser um usuário competente, não necessariamente especialista."],
      atividades: ["Não está trabalhando no momento, o que lhe dá flexibilidade", "Disposto a ajudar no back office do clube"],
      ia: ["Aprende melhor com aplicação prática; acha que palestra sem prática se perde", "Quer usar IA para tirar ideias do papel e gerar renda"],
      disp: "Flexível, por não estar trabalhando."
    },
    scores: { pro: 7.5, learn: 8.0, interest: 7.5 },
    why: {
      pro: "Se oferece para ajudar na organização e se considera proativo, mas sem uma proposta específica.",
      learn: "Quer aprender por prática, testando as ferramentas para entender o que fazem de concreto.",
      interest: "Interesse real e prático, com parte da motivação no currículo e na carreira."
    },
    summary: [
      "Quer aprender IA na prática para se diferenciar profissionalmente.",
      "Mais experiente que a maioria; o entrevistador vê nele um olhar crítico que falta aos membros mais jovens.",
      "Disposto a ajudar na organização do clube, conforme a disponibilidade.",
      "Alinhamento claro entre o objetivo do clube e o interesse dele."
    ],
    attention: ["Sem projeto de IA em andamento"]
  },
  {
    id: "ana", name: "Ana Victoria Manini", gender: "F",
    stage: "Estudante, em várias associações",
    tagline: "Transforma o Claude em máquina de capas e reels",
    look: { hair: "long", hairColor: "#3A1A9E", outfit: "#A98BFF", glasses: false, prop: "play" },
    src: ["Entrevista Ana Victoria Manini (áudio transcrito)"],
    resume: {
      perfil: ["Veio de Engenharia de Software no Marista e se define como proativa.", "Representou o Marista na feira de engenharia da UFMG com um projeto feito com duas colegas de Fisioterapia e Engenharia."],
      atividades: ["Marketing na Empresa Júnior", "Diretoria da Atlética", "Ateliê; o clube de IA seria a quarta associação"],
      ia: ["Usa Claude e ChatGPT o tempo todo: ideias de vídeo, reels, capas e prompts", "É quem faz as capas dos vídeos na Júnior", "Já programou no Replit e fez um jogo na engenharia", "Diz que a equipe automatizou tarefas que levavam uma manhã inteira"],
      disp: "Sextas às 10h e ao meio-dia sem problema. Quarta é incerta: tem folga à tarde na Júnior, mas a resposta não foi firme. Júnior tem reunião quinta ao meio-dia e marketing na terça às 10h."
    },
    scores: { pro: 9.0, learn: 8.5, interest: 8.0 },
    why: {
      pro: "Atua em várias associações ao mesmo tempo, já entregou projeto fora da faculdade e se descreve como alguém que resolve problema.",
      learn: "Quer entender como usar IA direito, já programou e se inscreveu no curso de machine learning.",
      interest: "Usa IA todo dia no trabalho de marketing. A motivação de entrada é mais geral: acha que quem não entender IA fica para trás."
    },
    summary: [
      "Usa IA todo dia no marketing da Júnior: ideias de vídeo, capas, prompts e automação de tarefas repetitivas.",
      "Já tem experiência com programação (Replit) e projeto de engenharia premiado com a ida à feira da UFMG.",
      "Quer entrar para aprender a usar IA do jeito certo e trocar conhecimento com os organizadores.",
      "Já se inscreveu no curso de machine learning e topa o clube de estudos."
    ],
    attention: ["Já participa de três associações", "Disponibilidade de quarta não ficou clara", "Reuniões fixas na Júnior (terça e quinta)"]
  },
  {
    id: "arthurp", name: "Arthur Pinheiro", gender: "M",
    stage: "1º período",
    tagline: "Autodidata que está montando o próprio app",
    look: { hair: "short", hairColor: "#17171F", outfit: "#26068D", glasses: false, prop: "code" },
    src: ["Entrevista Arthur Pinheiro, primeiro período (áudio transcrito)"],
    resume: {
      perfil: ["Está no 1º período e é autodidata em programação, sem formação na área.", "Forte em JavaScript e desenvolvimento web, conhece Node.js e começou a olhar Rust."],
      atividades: ["Trabalhou em uma plataforma de vendas de cursos e checkout; saiu no fim do ano passado", "Faz alguns trabalhos freelance de vez em quando"],
      ia: ["Aprendeu a programar com o FreeCodeCamp e depois com o Cursor, pedindo para a IA explicar o que não entendia", "Constrói uma ferramenta para montar apps web arrastando componentes e ligando fluxos em grafo; já refez projetos que não deram certo", "Pretende deixar o projeto open source"],
      disp: "Quarta à tarde, logo depois da aula. Sexta às 10h ou ao meio-dia; à tarde não, por causa da aula de cálculo."
    },
    scores: { pro: 8.5, learn: 9.5, interest: 8.5 },
    why: {
      pro: "Aprendeu sozinho, trabalhou na área e tem projetos próprios em andamento. Se comprometeu a avisar cedo quando não puder ir.",
      learn: "Estuda por conta própria, usa a IA como professora e refaz projetos até acertar. Está aprendendo Rust.",
      interest: "Procurava um grupo de tecnologia na faculdade e demonstrou interesse na hora em que soube do clube."
    },
    summary: [
      "Tem o perfil mais técnico dos entrevistados: JavaScript, Node.js e web, aprendido por conta própria.",
      "Usa IA para programar e para aprender, e já constrói uma ferramenta de arrastar componentes e fluxos.",
      "Topa ensinar o que sabe nos encontros de estudo e quer abrir o projeto como open source.",
      "Disponível na quarta à tarde e na sexta de manhã ou ao meio-dia; tem freelance ocasional."
    ],
    attention: ["Sextas à tarde não, por causa do cálculo", "Freelances pontuais", "Está no 1º período"]
  }
];
