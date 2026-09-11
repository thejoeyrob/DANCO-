(() => {
  'use strict';

  const VERSION = 19;
  const SESSION_KEY = 'dancoAssessment_adv_v13_session';
  const SETTINGS_KEY = 'dancoAssessment_adv_v13_settings';
  const APPLICATIONS_KEY = 'dancoAssessment_adv_v13_applications';
  const OWNER_KEY = 'dancoAssessment_adv_v11_owner';
  const TRIAL_KEY = 'dancoAssessment_adv_v11_trial';
  const TRIAL_USAGE_KEY = 'dancoAssessment_adv_v11_trialUsage';
  const ADMIN_HASH = '9793703E';
  const SHARED_SERVICE_URL = 'https://uneqycntlykjedaaynou.supabase.co/functions/v1/danco-service-v6';
  const DANCO_INVITES_URL = 'https://uneqycntlykjedaaynou.supabase.co/functions/v1/danco-invites';
  const DANCO_PLUS_ACCESS_URL = 'https://uneqycntlykjedaaynou.supabase.co/functions/v1/danco-plus-access';
  const DEVICE_ID_KEY = 'dancoAssessment_dancoPlus_deviceId';
  const DANCO_PLUS_APPROVAL_KEY = 'dancoAssessment_dancoPlus_approval';
  const DANCO_PLUS_INTRO_KEY = 'dancoAssessment_dancoPlus_introSeen';
  const DANCO_PLUS_REQUEST_KEY = 'dancoAssessment_dancoPlus_request';
  const OWNER_SESSION_KEY = 'dancoAssessment_dancoPlus_ownerSession';
  const OWNER_PRESENTATION_KEY = 'dancoAssessment_dancoPlus_ownerPresentation';
  const DANCO_PLUS_PITCH_PROMPT_KEY = 'dancoAssessment_dancoPlus_pitchPromptSeen_v1';
  const DANCO_PLUS_USER_PRESENTATION_KEY = 'dancoAssessment_dancoPlus_userPresentation';
  const OWNER_HASH = '5986B210';
  const TRIAL_RUNS = 3;
  const TRIAL_HASHES = new Set(['F083233F','AE44D52A','8CBCD409','AB6BB9D6','C0BA6D81','26399FF4','E2556F1A','9988758A','E61E252E','C495C2E8']);
  const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const XOR_STREAM = [0x31,0x9a,0x57,0xc4,0x0d,0xe3,0x68,0xb2,0x7f];
  const DISC_INDEX = { D:1, I:2, S:3, C:4 };
  const DISC_CODE = ['', 'D', 'I', 'S', 'C'];
  const DANCO_PLUS_PITCH_SCENES = [
    {speaker:'dan',headline:'One connected Danco hiring journey',visual:'journey',line:'Hi, I’m Dan. Think of Danco Plus as one connected hiring journey. Application, assessment, review, screening, offer and employment paperwork all move through the same Danco process instead of separate handoffs.'},
    {speaker:'brenda',headline:'One candidate record. Fewer handoffs.',visual:'record',line:'Hi, I’m Brenda. And that matters, Dan, because the same candidate information stays with the candidate. No rebuilding the story from forms, calls and inboxes. Danco sees one live record, one clear status and one next action.'},
    {speaker:'dan',headline:'Measure sales suitability for the role that matters now',visual:'sales',line:'Exactly. And for Commercial Account Manager candidates, Danco Plus measures the things that matter in the real role: commercial judgment, relationship strength, pipeline discipline, technical confidence and sales approach.'},
    {speaker:'brenda',headline:'A better interview, not a longer one',visual:'interview',line:'And that makes the interview better, not longer. The report gives the hiring team a suitability brief, the areas worth testing and four focused questions built around that individual candidate.'},
    {speaker:'dan',headline:'Screening moves into the same workflow',visual:'screening',line:'Then, when a candidate looks right, screening moves into the same workflow. The administrator can see the package, see the expected vendor cost and approve the request from the candidate report instead of starting another process somewhere else.'},
    {speaker:'brenda',headline:'Danco paperwork, without re-keying the candidate',visual:'contract',line:'And when the screening is satisfactory, Danco’s own employment agreement can be pre-filled from the same record, completed, signed and securely filed. No typing the same candidate information again just to move to the next stage.'},
    {speaker:'dan',headline:'Turn waiting time into forward motion',visual:'speed',line:'That is where the time starts to disappear. Fewer handoffs, less duplicate administration and less waiting between stages. When the right candidate is available and screening timing lines up, a process that can stretch across days can move in hours.'},
    {speaker:'brenda',headline:'Make the application itself part of the attraction',visual:'attract',line:'And the front end works just as hard. It is bilingual, role-specific and professional enough to turn a LinkedIn post, QR code or shared link into a serious application route that feels like Danco from the first click.'},
    {speaker:'dan',headline:'Better evidence. Human decision.',visual:'human',line:'So the decision stays where it belongs: with Danco. The app does not replace judgment. It gives the people making the decision better evidence, clearer direction and a consistent route from one stage to the next.'},
    {speaker:'brenda',headline:'From first application to payroll-ready',visual:'payroll',line:'Exactly, Dan. Danco Plus can take the right candidate from first application to a signed employment agreement ready for payroll in one connected path. What can otherwise stretch across days or weeks can, when everything aligns, become hours. Less admin. Less waiting. Better evidence. Faster confidence. That’s Danco Plus: hiring, built to move at Danco speed.'}
  ];

  // v34: Danco+ presentation still defaults to recorded audio.
  // Delivery has been tightened to feel more upbeat, and direct playable MP3 assets remain the default.
  // Scene 06 retains the corrected re-keying narration. Device TTS is never used as an automatic pitch fallback.
  const PREMIUM_PITCH_AUDIO = [
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/096d0dd6-da7a-40e3-a45f-5342a206499d.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/94d3ad02-9857-4e8d-b1e0-fb00e38ec69d.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/fa4f3dd7-2615-477c-a290-c21002aba1c4.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/f90539f4-abc1-4b98-b91e-c4a4bce48cd1.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/502fb2b7-96b9-4f29-9471-301dc369c169.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/550a00ae-8efa-4bbb-a314-94910513fc03.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/60def49a-a1f6-4fe1-9b51-99694582f285.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/bd95d6da-b389-4ae8-9b41-4e7582ffd9a0.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/51858cee-2526-417f-8b7e-8d8874349852.mp3',
    'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d73d3abe-fb7c-4f87-939e-19aef6d9bff0.mp3'
  ];
  if(PREMIUM_PITCH_AUDIO.length!==DANCO_PLUS_PITCH_SCENES.length){throw new Error('Danco+ pitch audio/scene mismatch');}
  const PITCH_AUDIO_PLAYBACK_RATE = 1.08;
  const pitchAudioPreload = new Map();
  function preloadPitchAudio(index){
    if(index<0||index>=PREMIUM_PITCH_AUDIO.length||pitchAudioPreload.has(index))return;
    try{const a=new Audio(PREMIUM_PITCH_AUDIO[index]);a.preload='auto';a.playbackRate=PITCH_AUDIO_PLAYBACK_RATE;a.defaultPlaybackRate=PITCH_AUDIO_PLAYBACK_RATE;try{a.preservesPitch=false;a.webkitPreservesPitch=false;a.mozPreservesPitch=false;}catch(_){ }pitchAudioPreload.set(index,a);}catch(_){/* handled during playback */}
  }
  const PREMIUM_GUIDE_AUDIO = {
    en:{
      setup:'https://www.aidocmaker.com/g0/audio?name=0ac81ab6646a4dd58c0d19df02bb9559',
      application:'https://www.aidocmaker.com/g0/audio?name=d454dfc7f7c049eda49f1f0f6578df29',
      profile:'https://www.aidocmaker.com/g0/audio?name=f8d0d8d252fa40b1b54cc52a8ae8df24',
      roofingInstructions:'https://www.aidocmaker.com/g0/audio?name=9f12d60d9eee430cbd07f5c98c06088e',
      salesInstructions:'https://www.aidocmaker.com/g0/audio?name=79be1e8d7bfa47758678d249d54ac05f',
      help:'https://www.aidocmaker.com/g0/audio?name=1d6a9993b8db4ed395fad9e107c87f68',
      complete:'https://www.aidocmaker.com/g0/audio?name=458e42b890994d6c87ff419701520456'
    },
    es:{
      setup:'https://www.aidocmaker.com/g0/audio?name=a534925291794d78b92efa1ac10164cb',
      application:'https://www.aidocmaker.com/g0/audio?name=60fdd80813744ccdaaa6da7cc269dae7',
      profile:'https://www.aidocmaker.com/g0/audio?name=cec2817f4b534414a5c1e67bd1b5c2d3',
      roofingInstructions:'https://www.aidocmaker.com/g0/audio?name=c9e1ca508abc4fbabfd54a8609155b86',
      salesInstructions:'https://www.aidocmaker.com/g0/audio?name=b7af65b5e4ea46b4896ec4b9e2836924',
      help:'https://www.aidocmaker.com/g0/audio?name=805cd133b30a403a9c49ede34e59553c',
      complete:'https://www.aidocmaker.com/g0/audio?name=2023f0376efa4bf9af865e85f7995324'
    }
  };
  const PREMIUM_QUESTION_AUDIO = {
    en:{
      profile:['2fd8f1b57694403794e90bdce19a92b2','93c89985f2e441d597abc178a98cb184','1ba30b8a8a6c483babe727f80e6c48af','cd5820531bb24708bbc159cc7b8ff0e1','22a258cd1a1c45c1a328d940d3cd3337'],
      roofing:['17777481573742569cad8ef6dd4a9cfe','4cf7dec4fe8848eaab5f65c21883117c','fa2fd7ffbae54440ae35bd8b985f76c3','824cdc3f20cf4121af0e5e37364e023f','0bf13d4222a3497c94d8e6438d58da09','d7bf94f371a640799ab604e8849496af','1ee09a0077f74498b0b3f87bc0a24220','5048cb30906b4da7b9d1568ae4c5adf3','6a2ff93d70a342cb859a6171669678ed','975d35578be04e84898a99070ae6f2de'],
      sales:['2e1c9f4dfbcf4c92b620426132dfb5db','20f3bc8ca8e54b5da493932469919f6e','342a3c0d45074b288dfab89efccdf27b','24356889b4d84ae487965676bb980a1b','1c47333af4384e7185dfbcb98d7fa859','a4d767b237f0446bab3c50e96e4ab746','1de2010b41bf4b4eb040afa7e2e2cf8e','d969421df82548f5bc65fbdfead37da0','bcba8c6821e44dc4a03e959f5dc196c6','577462544f7a4dd28def257a81532896']
    },
    es:{
      profile:['5046d4ffa0324aeda71221152ea40e70','6d62581847714355810e07d796cdbb48','efa0ade59bd34e8a94a0f1a6f4c22493','d5df91a652674ec4a69fad66ba71a992','6528d13fcb6c4851809674c16cdbbfd6'],
      roofing:['6a05efeb5e274776b51373a8cada78cf','5bf40088e6424df28d3bc1e939922c59','02b4941e395144378b833b4f159ecca5','bd6f33b78efc4d50aa6f54684b07482a','746fa394da524fe0a2e15602605fc126','2c7228fec3ac47379df73a07cfbe4a21','9f47dad2450e49aabb0404baa4e21c39','311080e49bb740a7b1957d2f6f6da4f6','aa77c2cd9cf64e7ea896db37b96942d4','c292eb996fc64b318d4d3c07dee99161'],
      sales:['8a5724c1d1584b78863f1607843fd1c2','abd10d34008e4ed69187fce8d911a93e','d097806df41040bba0dbdc6fec2faf3e','58400ea42ace4871891533733daa4501','eef42a87278f4a559b350925e21e94f8','d2327a863166425586eb4081146826e4','94a58762f7534a6aa143fe96800925aa','e1a76cfdbb864b19aae045de58c5a2e0','ce36825aa09540568e7d29c8ab02cfad','6f60a33c605044a9b73bf878c0c775f3']
    }
  };
  const PREMIUM_OPTION_ORDERS = [
    [2,0,3,1],[1,3,0,2],[0,2,1,3],[3,1,2,0],[2,1,0,3],
    [1,0,3,2],[3,2,1,0],[0,3,2,1],[2,0,1,3],[1,2,0,3]
  ];


  const BACKGROUND_DEMO_FALLBACK = {
    providers:['Checkr','GoodHire'],
    packages:[
      {code:'BASIC',label:'Basic',price:29.99,detail:'SSN trace, sex offender registry, global watchlist and national criminal search.'},
      {code:'ESSENTIAL',label:'Essential',price:59.99,detail:'Basic coverage plus identity verification and unlimited county criminal search.'},
      {code:'COMPLETE',label:'Complete',price:94.99,detail:'Essential coverage plus unlimited state criminal and federal criminal search.'}
    ],
    currency:'USD',
    passThroughFeesPossible:true
  };

  const TEXT = {
    en:{
      helperLabel:'YOUR DANCO TEAM HELPER',setupHelper:'I’ll guide you through each step. You can take your time setting up before the timed questions begin.',applicationSetupHelper:'Complete the Danco application details below. The work-style section and the role-specific assessment will follow.',stepOne:'STEP 1 OF 3 · SETUP',setupTitle:'Danco Workforce Assessment',setupLead:'Enter your full name to begin the Danco Workforce Assessment.',applicationSetupTitle:'Apply to work at Danco',applicationSetupLead:'Tell us about yourself, choose the position you are applying for and provide the details needed for Danco’s recruitment workflow.',nameLabel:'Full name',audioTitle:'Would audio support help?',audioOffTitle:'Continue without audio',audioOffCopy:'You can turn audio on later from the top bar.',audioOnTitle:'Use audio support',audioOnCopy:'Questions and guidance can be read aloud in your chosen language.',audioReasonTitle:'What would the audio support help with?',audioReasonLead:'This helps us apply the right support and record it accurately for the hiring team.',readingSupportTitle:'Reading support',readingSupportCopy:'Reading written questions is difficult.',sightSupportTitle:'Sight support',sightSupportCopy:'Seeing written content clearly is difficult.',audioPreferenceTitle:'Spoken-guidance preference',audioPreferenceCopy:'I prefer to hear the questions read aloud.',supportReasonError:'Please choose what the audio support will help with.',beginAssessment:'Begin Danco Workforce Assessment',beginApplicationAssessment:'Continue application',journeyChoiceTitle:'What would you like to do?',journeyChoiceLead:'Choose the route that applies to you. Danco can also lock this device to one route from the protected administrator settings.',journeyAssessmentTitle:'Danco Workforce Assessment',journeyAssessmentCopy:'For existing employees, internal development, refresher assessment or assessment-only use.',journeyApplicationTitle:'Apply to work at Danco',journeyApplicationCopy:'Complete the job application, work-style section and the role-specific assessment.',
      applicationEyebrow:'JOB APPLICATION',applicationDetailsTitle:'Your application details',prototypeOptional:'Optional during prototype testing',emailLabel:'Email address',phoneLabel:'Phone number',locationLabel:'City and state',availabilityLabel:'Available start date',desiredRoleLabel:'Position applied for',chooseRole:'Choose a role',experienceLabel:'Commercial roofing experience',chooseExperience:'Choose experience',workAuthorizationLabel:'Authorized to work in the United States?',licenseLabel:'Valid driver’s license?',chooseAnswer:'Choose an answer',otherRolesLegend:'Would you consider another listed role if it better matches your assessment?',otherRolesYes:'Yes, I’m open to other roles',otherRolesNo:'No, only the role selected above',backgroundConsentLegend:'If your application progresses, do you consent to Danco requesting an employment background screening?',backgroundConsentYes:'Yes, I consent to a background screening if my application progresses',backgroundConsentNo:'No, I do not consent',backgroundReasonLabel:'Please provide a reason',backgroundReasonPlaceholder:'Briefly explain your answer',backgroundConsentNote:'Prototype acknowledgement only. A live screening provider would present its own formal disclosure and authorization before any check is run.',
      stepTwo:'STEP 2 OF 3 · GETTING TO KNOW YOU',profileIntroTitle:'Before we get into the assessment…',profileIntroOne:'We’re happy that you’re looking to join the Danco Roofing team. We focus on working together and helping our workforce feel comfortable when interacting with one another.',profileIntroTwo:'We’d like to take a moment to get to know how you prefer to work. The next five friendly questions have no timer, and there are no right or wrong answers.',profilePrivacy:'This optional section is used only as a gentle workplace-engagement guide for the hiring team. Your estimated result will not be shown on your applicant result screen.',startFive:'Answer 5 quick questions',skipProfile:'Skip this section',skipRecorded:'If you skip, the assessment report will simply note “not completed”.',noTimer:'NO TIMER',profileHint:'Choose the answer that feels most natural to you.',confirmAnswerHint:'Select an option, then confirm it.',confirmFinalAnswer:'Confirm final answer',answerSelectedHint:'Your choice is selected. Confirm it or choose another option.',
      stepThree:'STEP 3 OF 3 · TRADE ASSESSMENT',instructionsTitle:'Ten focused questions',instructionsLead:'The assessment checks practical roofing knowledge, safe decision-making and role readiness.',featureQuestions:'Questions',featureQuestionsCopy:'Seven include visual answer choices',featureTiming:'Review then answer',featureTimingCopy:'A clear timer appears for each stage',featureChoice:'One answer',featureChoiceCopy:'Choose the single best response',featureResult:'Private result',featureResultCopy:'You receive a result code, not a score',timingNotice:'First, review the question while the answer cards are locked. When the answer timer begins, select one response. Unanswered questions are recorded as timed out.',supportActiveTitle:'Accessibility support is active.',supportActiveCopy:'Extra answer time and the Repeat question control are enabled.',repeatQuestion:'Repeat question',startQuestions:'Start the 10 questions',
      completeEyebrow:'ASSESSMENT COMPLETE',completeTitle:'Thank you for taking part',completeLead:'Your responses have been converted into the result code below.',applicationCompleteEyebrow:'DANCO APPLICATION COMPLETE',applicationCompleteTitle:'Your Danco application is complete',applicationCompleteLead:'Submit your completed application to Danco when you are ready.',applicationSubmittedTitle:'Thank you for your application',applicationSubmittedLead:'Your application has been received. Danco will contact you after it has been reviewed.',resultCodeLabel:'Result code',applicationNumberLabel:'Application reference',applicationReferencePending:'Pending secure submission',appliedPositionLabel:'Position applied for',otherPositionsLabel:'Open to other listed positions',notSpecified:'Not specified',yesLabel:'Yes',noLabel:'No',copyCode:'Copy result code',copyApplicationNumber:'Copy application reference',resultInstruction:'Save this code and provide it to the Danco administrator or hiring contact. Your score and private work-style guide are not shown on this screen.',applicationResultInstruction:'Your score and private work-style guide are not displayed. Submit the completed application to Danco’s protected review list.',applicationSubmittedInstruction:'Keep this reference for your records. Your full result is available only in the protected Danco administrator dashboard.',submitApplication:'Submit application for review',submitAssessment:'Submit assessment for review',submitApplicationNote:'Completed applications and workforce assessments can be submitted directly to Danco’s protected shared review list.',submitTitle:'Submit to Danco for review?',submitCopy:'This completed record will be added to Danco’s protected shared review list. No administrator code is required from the applicant.',administratorPin:'Administrator PIN',confirmSubmit:'Submit securely',submissionSaved:'Submission saved to the shared Danco review list.',submissionAlreadySaved:'This submission is already in the shared review list.',submissionFailed:'The shared service could not save this result. Check the connection and try again.',invalidAdminPin:'Administrator PIN not recognized.',nextApplicant:'Start next applicant',help:'Help',helpTitle:'Need a hand?',helpDefault:'Follow the instruction shown at the top of the current screen. During the timed assessment, review first and select one answer when the cards become active.',repeatAudio:'Repeat spoken audio',repeatAudioHint:'Hear the current instruction or question again.',voiceLabel:'Narration voice',standardVoiceTitle:'Dan & Brenda · Danco voices',standardVoiceCopy:'English alternates Dan and Brenda across the experience. Spanish uses Brenda throughout, with the optimized recorded Danco pack as a local fallback.',deviceVoiceTitle:'Device default reader',deviceVoiceCopy:'Uses the default English or Spanish system reader installed on this phone, tablet or computer.',testVoice:'Test selected voice',voiceSample:'Hello. I’m your Danco assessment guide. I’ll read each question clearly.',narrationUnavailable:'This narration clip is unavailable. The written question remains on screen.',tapRepeatAudio:'Tap Repeat spoken audio to hear this again.',gotIt:'Got it',helpersWithYou:'Your Danco team helpers are with you',profileUntimedReminder:'Take your time—this section is not timed.',timedReminder:'Your selected-language helper has the visual focus.',fullscreenOn:'Full-screen app view active.',fullscreenOff:'Full-screen app view closed.',fullscreenIos:'App view expanded. For a completely borderless iPhone experience, add the assessment to your Home Screen.',
      unlockTitle:'Unlock the assessment trial',unlockCopy:'Enter the private access code supplied by Danco. A valid trial code activates up to three completed assessments on this browser or device.',unlockStepOne:'Enter the supplied code below.',unlockStepTwo:'Select “Activate trial”.',unlockStepThree:'Return to setup and begin the assessment.',accessCodeLabel:'Private access code',activateTrial:'Activate trial',unlockPrivacy:'Codes are never displayed by the app. Re-entering the same code does not restore used trial runs.',
      accessLockedTitle:'Prototype locked',accessLockedCopy:'Enter the private trial code supplied by Danco before beginning.',accessTrialTitle:'Prototype trial active',accessTrialCopy:n=>`${n} completed assessment${n===1?'':'s'} remaining on this browser or device.`,accessOwnerTitle:'Full access active',accessOwnerCopy:'Unlimited local assessments are enabled on this device.',namePlaceholder:'Your full name',codePlaceholder:'Enter code',requiredError:'Please enter your full name.',lockedError:'A valid private access code is required before the assessment can begin.',usedError:'This trial has no completed assessments remaining.',profileCounter:(n)=>`Question ${n} of 5`,knowledgeCounter:(n)=>`Question ${n} of 10`,review:'REVIEW',answer:'ANSWER',reviewHint:'Review the question. Answer choices will unlock when the timer changes to ANSWER.',answerHint:'Select the single best answer and confirm it before the timer reaches zero.',timedOut:'Time expired. Moving to the next question.',copied:'Result code copied.',copyFailed:'Press and hold the code to copy it.',profileSkipped:'Optional work-style questions: not completed',profileDone:'Optional work-style questions: completed',trialRemaining:n=>`Trial assessments remaining: ${n}`,ownerActive:'Full access · unlimited assessments',unlockSuccess:n=>`Trial activated with ${n} assessments available.`,ownerSuccess:'Full access activated.',invalidCode:'Access code not recognized.',resume:'Resume assessment',
      categories:{materials:'Roof products',installation:'Installation & tools',service:'Service & diagnosis',safety:'Site & lifting safety',supervision:'Foreman control'},tiers:{foundation:'Foundation',roofer:'Roofer level',foreman:'Foreman level'}
    },
    es:{
      helperLabel:'TU GUÍA DEL EQUIPO DANCO',setupHelper:'Te guiaré en cada paso. Puedes tomarte tu tiempo para prepararte antes de que comiencen las preguntas cronometradas.',applicationSetupHelper:'Completa todos los datos que puedas. Durante la prueba del prototipo solo se requiere tu nombre completo, y después seguirá la evaluación.',stepOne:'PASO 1 DE 3 · PREPARACIÓN',setupTitle:'Evaluación de la fuerza laboral de Danco',setupLead:'Ingresa tu nombre completo para comenzar la evaluación de la fuerza laboral de Danco.',applicationSetupTitle:'Solicitar trabajo en Danco',applicationSetupLead:'Cuéntanos sobre ti, elige el puesto que solicitas y proporciona los datos necesarios para el proceso de contratación de Danco.',nameLabel:'Nombre completo',audioTitle:'¿Te ayudaría el apoyo de audio?',audioOffTitle:'Continuar sin audio',audioOffCopy:'Puedes activar el audio más tarde desde la barra superior.',audioOnTitle:'Usar apoyo de audio',audioOnCopy:'Las preguntas y la guía se pueden leer en voz alta en español.',audioReasonTitle:'¿Con qué te ayudaría el apoyo de audio?',audioReasonLead:'Esto nos permite aplicar el apoyo adecuado y registrarlo correctamente para el equipo de contratación.',readingSupportTitle:'Apoyo para la lectura',readingSupportCopy:'Me resulta difícil leer las preguntas escritas.',sightSupportTitle:'Apoyo para la vista',sightSupportCopy:'Me resulta difícil ver claramente el contenido escrito.',audioPreferenceTitle:'Preferencia por la guía hablada',audioPreferenceCopy:'Prefiero escuchar las preguntas en voz alta.',supportReasonError:'Elige con qué te ayudará el apoyo de audio.',beginAssessment:'Comenzar evaluación de la fuerza laboral',beginApplicationAssessment:'Continuar solicitud',journeyChoiceTitle:'¿Qué te gustaría hacer?',journeyChoiceLead:'Elige la ruta que corresponda. Danco también puede bloquear este dispositivo a una sola ruta desde el área protegida de administración.',journeyAssessmentTitle:'Evaluación de la fuerza laboral de Danco',journeyAssessmentCopy:'Para empleados actuales, desarrollo interno, evaluación de actualización o uso solo de evaluación.',journeyApplicationTitle:'Solicitar trabajo en Danco',journeyApplicationCopy:'Completa la solicitud de empleo, la sección de estilo de trabajo y la evaluación específica del puesto.',
      applicationEyebrow:'SOLICITUD DE EMPLEO',applicationDetailsTitle:'Datos de tu solicitud',prototypeOptional:'Opcional durante la prueba del prototipo',emailLabel:'Correo electrónico',phoneLabel:'Número de teléfono',locationLabel:'Ciudad y estado',availabilityLabel:'Fecha disponible para comenzar',desiredRoleLabel:'Puesto solicitado',chooseRole:'Elige un puesto',experienceLabel:'Experiencia en techos comerciales',chooseExperience:'Elige tu experiencia',workAuthorizationLabel:'¿Tienes autorización para trabajar en Estados Unidos?',licenseLabel:'¿Tienes licencia de conducir válida?',chooseAnswer:'Elige una respuesta',otherRolesLegend:'¿Considerarías otro puesto de la lista si se ajusta mejor a tu evaluación?',otherRolesYes:'Sí, estoy abierto a otros puestos',otherRolesNo:'No, solo el puesto seleccionado',backgroundConsentLegend:'Si tu solicitud avanza, ¿autorizas a Danco a solicitar una verificación de antecedentes laborales?',backgroundConsentYes:'Sí, autorizo una verificación si mi solicitud avanza',backgroundConsentNo:'No, no autorizo',backgroundReasonLabel:'Indica el motivo',backgroundReasonPlaceholder:'Explica brevemente tu respuesta',backgroundConsentNote:'Reconocimiento solo para el prototipo. Un proveedor real presentaría su divulgación y autorización formal antes de realizar cualquier verificación.',
      stepTwo:'PASO 2 DE 3 · CONOCERTE',profileIntroTitle:'Antes de comenzar la evaluación…',profileIntroOne:'Nos alegra que estés interesado en unirte al equipo de Danco Roofing. Nos enfocamos en trabajar juntos y en ayudar a nuestro personal a sentirse cómodo al interactuar.',profileIntroTwo:'Nos gustaría conocerte un poco y saber cómo prefieres trabajar. Las siguientes cinco preguntas son sencillas, no tienen límite de tiempo y no hay respuestas correctas o incorrectas.',profilePrivacy:'Esta sección opcional se usa únicamente como una guía amable de interacción laboral para el equipo de contratación. El resultado estimado no aparecerá en tu pantalla final.',startFive:'Responder 5 preguntas rápidas',skipProfile:'Omitir esta sección',skipRecorded:'Si decides omitirla, el informe simplemente indicará “no completada”.',noTimer:'SIN LÍMITE',profileHint:'Elige la respuesta que te resulte más natural.',confirmAnswerHint:'Selecciona una opción y después confírmala.',confirmFinalAnswer:'Confirmar respuesta final',answerSelectedHint:'Tu opción está seleccionada. Confírmala o elige otra.',
      stepThree:'PASO 3 DE 3 · EVALUACIÓN TÉCNICA',instructionsTitle:'Diez preguntas enfocadas',instructionsLead:'La evaluación revisa conocimientos prácticos de techado, decisiones seguras y preparación para el puesto.',featureQuestions:'Preguntas',featureQuestionsCopy:'Siete incluyen opciones visuales',featureTiming:'Revisar y responder',featureTimingCopy:'Cada etapa muestra un cronómetro claro',featureChoice:'Una respuesta',featureChoiceCopy:'Elige la mejor respuesta',featureResult:'Resultado privado',featureResultCopy:'Recibirás un código, no una puntuación',timingNotice:'Primero revisa la pregunta mientras las opciones están bloqueadas. Cuando comience el tiempo de respuesta, selecciona una opción. Las preguntas sin responder se registran como agotadas.',supportActiveTitle:'El apoyo de accesibilidad está activo.',supportActiveCopy:'Se habilitaron tiempo adicional y el control Repetir pregunta.',repeatQuestion:'Repetir pregunta',startQuestions:'Comenzar las 10 preguntas',
      completeEyebrow:'EVALUACIÓN COMPLETADA',completeTitle:'Gracias por participar',completeLead:'Tus respuestas se convirtieron en el siguiente código de resultado.',applicationCompleteEyebrow:'EVALUACIÓN DE SOLICITUD COMPLETADA',applicationCompleteTitle:'La evaluación de tu solicitud está completa',applicationCompleteLead:'Cuando estés listo, envía tu solicitud directamente a la lista protegida de revisión de Danco.',applicationSubmittedTitle:'Gracias por tu solicitud',applicationSubmittedLead:'Hemos recibido tu solicitud. Danco se pondrá en contacto contigo después de revisarla.',resultCodeLabel:'Código de resultado',applicationNumberLabel:'Referencia de solicitud',applicationReferencePending:'Envío seguro pendiente',appliedPositionLabel:'Puesto solicitado',otherPositionsLabel:'Abierto a otros puestos de la lista',notSpecified:'No especificado',yesLabel:'Sí',noLabel:'No',copyCode:'Copiar código',copyApplicationNumber:'Copiar referencia de solicitud',resultInstruction:'Guarda este código y entrégalo al administrador o contacto de contratación de Danco. Tu puntuación y la guía privada de estilo de trabajo no aparecen en esta pantalla.',applicationResultInstruction:'Tu puntuación y la guía privada de estilo de trabajo no se muestran. Envía la solicitud completada a la lista protegida de revisión de Danco.',applicationSubmittedInstruction:'Guarda esta referencia. Tu resultado completo solo está disponible en el panel protegido del administrador de Danco.',submitApplication:'Enviar solicitud para revisión',submitAssessment:'Enviar evaluación para revisión',submitApplicationNote:'Las solicitudes y evaluaciones completadas pueden enviarse directamente a la lista protegida de revisión compartida de Danco.',submitTitle:'¿Enviar a Danco para revisión?',submitCopy:'Este registro completado se añadirá a la lista protegida de revisión compartida de Danco. El solicitante no necesita un código de administrador.',administratorPin:'PIN de administrador',confirmSubmit:'Enviar de forma segura',submissionSaved:'Resultado guardado en la lista compartida de Danco.',submissionAlreadySaved:'Este resultado ya está en la lista compartida.',submissionFailed:'El servicio compartido no pudo guardar el resultado. Comprueba la conexión e inténtalo de nuevo.',invalidAdminPin:'PIN de administrador no reconocido.',nextApplicant:'Comenzar siguiente solicitante',help:'Ayuda',helpTitle:'¿Necesitas ayuda?',helpDefault:'Sigue la instrucción que aparece en la parte superior. Durante la evaluación cronometrada, primero revisa y luego elige una respuesta cuando se activen las opciones.',repeatAudio:'Repetir audio',repeatAudioHint:'Escucha de nuevo la instrucción o pregunta actual.',voiceLabel:'Voz de narración',standardVoiceTitle:'Brenda · voz de Danco',standardVoiceCopy:'En español, Brenda guía toda la experiencia. El paquete grabado optimizado de Danco permanece disponible como respaldo local.',deviceVoiceTitle:'Lector predeterminado del dispositivo',deviceVoiceCopy:'Usa el lector del sistema en inglés o español instalado en este teléfono, tableta o computadora.',testVoice:'Probar voz seleccionada',voiceSample:'Hola. Soy tu guía para la evaluación de Danco. Leeré cada pregunta con claridad.',narrationUnavailable:'Este fragmento de audio no está disponible. La pregunta escrita permanece en pantalla.',tapRepeatAudio:'Toca Repetir audio para escucharlo de nuevo.',gotIt:'Entendido',helpersWithYou:'Tus guías del equipo Danco están contigo',profileUntimedReminder:'Tómate tu tiempo; esta sección no tiene límite.',timedReminder:'La guía de tu idioma elegido tiene el enfoque visual.',fullscreenOn:'Vista de aplicación en pantalla completa activa.',fullscreenOff:'Vista de pantalla completa cerrada.',fullscreenIos:'Vista ampliada. Para una experiencia sin bordes en iPhone, agrega la evaluación a la pantalla de inicio.',
      unlockTitle:'Desbloquear la prueba',unlockCopy:'Ingresa el código privado proporcionado por Danco. Un código de prueba válido permite hasta tres evaluaciones completadas en este navegador o dispositivo.',unlockStepOne:'Ingresa el código proporcionado.',unlockStepTwo:'Selecciona “Activar prueba”.',unlockStepThree:'Regresa a la preparación y comienza.',accessCodeLabel:'Código de acceso privado',activateTrial:'Activar prueba',unlockPrivacy:'La aplicación nunca muestra los códigos. Volver a ingresar el mismo código no recupera usos ya consumidos.',
      accessLockedTitle:'Prototipo bloqueado',accessLockedCopy:'Ingresa el código privado de prueba proporcionado por Danco antes de comenzar.',accessTrialTitle:'Prueba de prototipo activa',accessTrialCopy:n=>`Quedan ${n} evaluación${n===1?'':'es'} completada${n===1?'':'s'} en este navegador o dispositivo.`,accessOwnerTitle:'Acceso completo activo',accessOwnerCopy:'Este dispositivo tiene evaluaciones locales ilimitadas.',namePlaceholder:'Tu nombre completo',codePlaceholder:'Ingresa el código',requiredError:'Ingresa tu nombre completo.',lockedError:'Se necesita un código de acceso privado válido antes de comenzar.',usedError:'Esta prueba ya no tiene evaluaciones disponibles.',profileCounter:(n)=>`Pregunta ${n} de 5`,knowledgeCounter:(n)=>`Pregunta ${n} de 10`,review:'REVISAR',answer:'RESPONDER',reviewHint:'Revisa la pregunta. Las opciones se activarán cuando el cronómetro cambie a RESPONDER.',answerHint:'Selecciona la mejor respuesta y confírmala antes de que el cronómetro llegue a cero.',timedOut:'Tiempo agotado. Pasando a la siguiente pregunta.',copied:'Código copiado.',copyFailed:'Mantén presionado el código para copiarlo.',profileSkipped:'Preguntas opcionales de estilo de trabajo: no completadas',profileDone:'Preguntas opcionales de estilo de trabajo: completadas',trialRemaining:n=>`Evaluaciones de prueba restantes: ${n}`,ownerActive:'Acceso completo · evaluaciones ilimitadas',unlockSuccess:n=>`Prueba activada con ${n} evaluaciones disponibles.`,ownerSuccess:'Acceso completo activado.',invalidCode:'Código de acceso no reconocido.',resume:'Continuar evaluación',
      categories:{materials:'Productos para techos',installation:'Instalación y herramientas',service:'Servicio y diagnóstico',safety:'Seguridad en obra e izaje',supervision:'Control del encargado'},tiers:{foundation:'Base',roofer:'Nivel techador',foreman:'Nivel encargado'}
    }
  };

  const PROFILE_QUESTIONS = [
    {en:'When a new team task begins, what feels most natural?',es:'Cuando comienza una nueva tarea en equipo, ¿qué te resulta más natural?',options:[
      {disc:'D',en:'Get moving and focus on the result',es:'Comenzar y enfocarme en el resultado'},
      {disc:'S',en:'Make sure everyone is comfortable with the plan',es:'Asegurarme de que todos estén cómodos con el plan'},
      {disc:'I',en:'Talk it through and build some energy',es:'Conversarlo y crear entusiasmo'},
      {disc:'C',en:'Check the details and expectations first',es:'Revisar primero los detalles y expectativas'}]},
    {en:'If plans change unexpectedly, what usually helps you most?',es:'Si los planes cambian de repente, ¿qué suele ayudarte más?',options:[
      {disc:'C',en:'Clear facts and an updated plan',es:'Datos claros y un plan actualizado'},
      {disc:'I',en:'A quick conversation with the team',es:'Una conversación rápida con el equipo'},
      {disc:'D',en:'Freedom to make a practical decision',es:'Libertad para tomar una decisión práctica'},
      {disc:'S',en:'A calm explanation and time to adjust',es:'Una explicación tranquila y tiempo para adaptarme'}]},
    {en:'How do you prefer a coworker to explain something important?',es:'¿Cómo prefieres que un compañero explique algo importante?',options:[
      {disc:'S',en:'Patiently, with time for questions',es:'Con paciencia y tiempo para preguntas'},
      {disc:'D',en:'Directly, with the key action first',es:'Directamente, empezando por la acción principal'},
      {disc:'C',en:'Precisely, with the correct detail',es:'Con precisión y el detalle correcto'},
      {disc:'I',en:'In a friendly, conversational way',es:'De manera amable y conversacional'}]},
    {en:'On a busy workday, which contribution sounds most like you?',es:'En un día de mucho trabajo, ¿qué aporte se parece más a ti?',options:[
      {disc:'I',en:'Keeping communication positive',es:'Mantener una comunicación positiva'},
      {disc:'C',en:'Keeping the work organized and accurate',es:'Mantener el trabajo organizado y preciso'},
      {disc:'S',en:'Keeping a steady and dependable pace',es:'Mantener un ritmo constante y confiable'},
      {disc:'D',en:'Keeping the team focused on completion',es:'Mantener al equipo enfocado en terminar'}]},
    {en:'When learning a new task, what approach suits you best?',es:'Al aprender una tarea nueva, ¿qué enfoque te conviene más?',options:[
      {disc:'D',en:'Let me try it and improve as I go',es:'Permíteme intentarlo y mejorar sobre la marcha'},
      {disc:'I',en:'Show me with someone I can ask',es:'Muéstramelo con alguien a quien pueda preguntar'},
      {disc:'C',en:'Give me clear instructions and standards',es:'Dame instrucciones y estándares claros'},
      {disc:'S',en:'Take me through it step by step',es:'Guíame paso a paso'}]}
  ];

  const QUESTIONS = [
    {id:1,tier:'foundation',cat:'materials',critical:false,read:8,answer:20,hideText:true,
      en:'Which product is EPDM membrane?',es:'¿Qué producto es una membrana EPDM?',
      options:[
        {en:'Black EPDM rubber membrane',es:'Membrana de caucho EPDM negra',img:'visual-epdm.png'},
        {en:'White TPO membrane',es:'Membrana TPO blanca',img:'visual-tpo.png'},
        {en:'PVC membrane',es:'Membrana PVC',img:'visual-pvc.png'},
        {en:'Standing-seam metal roofing',es:'Techo metálico de junta alzada',img:'visual-metal.png'}],correct:0},
    {id:2,tier:'roofer',cat:'installation',critical:false,read:9,answer:22,hideText:true,
      en:'Which image shows the correct mechanically attached TPO seam?',es:'¿Qué imagen muestra la junta TPO con fijación mecánica correcta?',
      options:[
        {en:'Concealed fastening row with a clean heat weld',es:'Fijación oculta y soldadura térmica limpia',img:'visual-tpo_correct.png'},
        {en:'Exposed fastening plates beside the lap',es:'Placas de fijación expuestas junto al traslape',img:'visual-tpo_exposed.png'},
        {en:'Wrinkled lap with an open fishmouth',es:'Traslape arrugado con una boca de pez abierta',img:'visual-tpo_fishmouth.png'},
        {en:'Poor field layout with pronounced wrinkles',es:'Distribución deficiente con arrugas marcadas',img:'visual-tpo_badlayout.png'}],correct:0},
    {id:3,tier:'foundation',cat:'safety',critical:true,read:8,answer:18,
      en:'Roof-access ladder rails should extend at least:',es:'Los rieles de una escalera de acceso al techo deben sobresalir al menos:',
      options:[
        {en:'3 ft above the landing',es:'3 pies sobre el punto de acceso',img:'visual-ladder-3ft.png'},
        {en:'1 ft above the landing',es:'1 pie sobre el punto de acceso',img:'visual-ladder-1ft.png'},
        {en:'2 ft above the landing',es:'2 pies sobre el punto de acceso',img:'visual-ladder-2ft.png'},
        {en:'Flush with the landing',es:'Al ras del punto de acceso',img:'visual-ladder-flush.png'}],correct:0},
    {id:4,tier:'roofer',cat:'installation',critical:false,read:8,answer:20,
      en:'Which tool checks a cooled TPO weld?',es:'¿Qué herramienta revisa una soldadura TPO ya enfriada?',
      options:[
        {en:'Seam probe',es:'Sonda de junta',img:'visual-tool-seam-probe.png'},
        {en:'Core cutter',es:'Cortador de núcleo',img:'visual-tool-core-cutter.png'},
        {en:'Chalk reel',es:'Cordel con tiza',img:'visual-tool-chalk-reel.png'},
        {en:'Tin snips',es:'Tijeras para metal',img:'visual-tool-tin-snips.png'}],correct:0},
    {id:5,tier:'roofer',cat:'installation',critical:false,read:8,answer:20,
      en:'The TPO lap is dirty before welding. What is the first move?',es:'El traslape TPO está sucio antes de soldar. ¿Cuál es el primer paso?',
      options:[
        {en:'Clean and dry the welding area',es:'Limpiar y secar el área de soldadura',img:'visual-action-clean-dry.png'},
        {en:'Increase the welder heat',es:'Aumentar el calor del soldador',img:'visual-action-more-heat.png'},
        {en:'Increase the sheet overlap',es:'Aumentar el traslape de la lámina',img:'visual-action-more-overlap.png'},
        {en:'Seal over the contaminated lap',es:'Sellar encima del traslape contaminado',img:'visual-action-seal-over.png'}],correct:0},
    {id:6,tier:'foundation',cat:'service',critical:false,read:7,answer:18,
      en:'You uncover wet roof insulation. What should happen next?',es:'Encuentras aislamiento húmedo en el techo. ¿Qué debe hacerse después?',
      options:[
        {en:'Remove and replace the affected material',es:'Retirar y reemplazar el material afectado'},
        {en:'Cover it with the new membrane',es:'Cubrirlo con la membrana nueva'},
        {en:'Add dry coverboard over it',es:'Agregar tablero seco encima'},
        {en:'Leave it until final inspection',es:'Dejarlo hasta la inspección final'}],correct:0},
    {id:7,tier:'roofer',cat:'service',critical:false,read:8,answer:20,
      en:'An interior stain is 20 ft from a rooftop curb. Where should diagnosis begin?',es:'Una mancha interior está a 20 pies de un pretil del techo. ¿Dónde debe comenzar el diagnóstico?',
      options:[
        {en:'Trace likely water-entry paths',es:'Rastrear las posibles rutas de entrada de agua'},
        {en:'Cut the roof directly above the stain',es:'Cortar el techo directamente sobre la mancha'},
        {en:'Seal every nearby curb',es:'Sellar todos los pretiles cercanos'},
        {en:'Replace the ceiling below',es:'Reemplazar el cielo raso inferior'}],correct:0},
    {id:8,tier:'foreman',cat:'safety',critical:true,read:8,answer:20,
      en:'The crane operator cannot see the roof landing point. Who gives the signals?',es:'El operador de la grúa no puede ver el punto de descarga en el techo. ¿Quién da las señales?',
      options:[
        {en:'A qualified signal person',es:'Una persona señalera calificada',img:'visual-signal-qualified.png'},
        {en:'The nearest roofer',es:'El techador más cercano',img:'visual-signal-roofer.png'},
        {en:'The delivery driver',es:'El conductor de entrega',img:'visual-signal-driver.png'},
        {en:'Nobody if radios are available',es:'Nadie si hay radios disponibles',img:'visual-signal-none.png'}],correct:0},
    {id:9,tier:'foreman',cat:'supervision',critical:false,read:8,answer:20,
      en:'Weather conditions change and the TPO test weld fails. What is the next move?',es:'Cambian las condiciones climáticas y falla la soldadura de prueba TPO. ¿Qué sigue?',
      options:[
        {en:'Reset the welding settings and complete a new test',es:'Reajustar la soldadura y completar una nueva prueba'},
        {en:'Reduce the robot speed only',es:'Reducir únicamente la velocidad del robot'},
        {en:'Continue welding and probe it later',es:'Continuar soldando y revisarlo después'},
        {en:'Cover the failed weld with tape',es:'Cubrir la soldadura fallida con cinta'}],correct:0},
    {id:10,tier:'foreman',cat:'installation',critical:false,read:8,answer:20,
      en:'Wind-uplift attachment is normally greatest in which roof zones?',es:'¿En qué zonas del techo suele ser mayor la fijación contra la succión del viento?',
      options:[
        {en:'Corners and perimeter',es:'Esquinas y perímetro',img:'visual-zone-perimeter.png'},
        {en:'Field center only',es:'Solo el centro del techo',img:'visual-zone-center.png'},
        {en:'Around roof drains only',es:'Solo alrededor de los desagües',img:'visual-zone-drain.png'},
        {en:'Equally across all zones',es:'Igual en todas las zonas',img:'visual-zone-equal.png'}],correct:0}
  ];


  const SALES_QUESTIONS = [
    {id:1,weight:15,tierLabel:{en:'Commercial experience',es:'Experiencia comercial'},catLabel:{en:'Experience & market',es:'Experiencia y mercado'},read:9,answer:25,
      en:'Which description best matches your strongest recent sales experience?',es:'¿Qué descripción se ajusta mejor a tu experiencia de ventas reciente más sólida?',options:[
        {en:'Regional commercial construction B2B sales to property, facility, contractor or developer accounts',es:'Ventas B2B regionales de construcción comercial a cuentas de propiedades, instalaciones, contratistas o desarrolladores',fit:100,styles:['relationship','strategic']},
        {en:'Regional commercial roofing sales with established customer relationships and repeat account responsibility',es:'Ventas regionales de techado comercial con relaciones establecidas y responsabilidad sobre cuentas recurrentes',fit:82,styles:['technical','relationship']},
        {en:'B2B account sales outside construction, including new business and account retention',es:'Ventas B2B fuera de la construcción, incluyendo nuevo negocio y retención de cuentas',fit:62,styles:['driver','relationship']},
        {en:'Consumer or service sales with some business accounts but limited commercial-account ownership',es:'Ventas de consumo o servicios con algunas cuentas empresariales pero responsabilidad comercial limitada',fit:28,styles:['driver']}]},
    {id:2,weight:15,tierLabel:{en:'Portable relationships',es:'Relaciones transferibles'},catLabel:{en:'Network & territory',es:'Red y territorio'},read:9,answer:25,
      en:'Which statement best describes the business relationships you could realistically bring into a Danco territory?',es:'¿Qué afirmación describe mejor las relaciones comerciales que podrías aportar de forma realista a un territorio de Danco?',options:[
        {en:'Active regional relationships with property, facility, contractor, developer or construction decision-makers',es:'Relaciones regionales activas con responsables de propiedades, instalaciones, contratistas, desarrolladores o construcción',fit:100,styles:['relationship','strategic']},
        {en:'Strong regional network from an adjacent construction trade selling to many of the same buyers',es:'Red regional sólida de un oficio de construcción adyacente que vende a muchos de los mismos compradores',fit:94,styles:['relationship','strategic']},
        {en:'Broad B2B network with some property or construction contacts but no concentrated sector base',es:'Red B2B amplia con algunos contactos de propiedades o construcción, pero sin una base sectorial concentrada',fit:62,styles:['relationship']},
        {en:'Limited portable relationships; the territory would mostly be built through new prospecting',es:'Relaciones transferibles limitadas; el territorio se construiría principalmente mediante nueva prospección',fit:30,styles:['driver']}]},
    {id:3,weight:12,tierLabel:{en:'New business',es:'Nuevo negocio'},catLabel:{en:'Territory development',es:'Desarrollo de territorio'},read:9,answer:25,
      en:'You inherit a territory with growth potential. What would your first 60 days look like?',es:'Heredas un territorio con potencial de crecimiento. ¿Cómo serían tus primeros 60 días?',options:[
        {en:'Segment the territory, reactivate relationships, target accounts, prospect consistently and learn the product in parallel',es:'Segmentar el territorio, reactivar relaciones, priorizar cuentas, prospectar con constancia y aprender el producto en paralelo',fit:100,styles:['strategic','driver']},
        {en:'Lead with high activity: calls, visits and appointment generation while learning the market',es:'Liderar con mucha actividad: llamadas, visitas y generación de citas mientras aprendo el mercado',fit:68,styles:['driver']},
        {en:'Build technical product knowledge first, then expand prospecting as confidence increases',es:'Desarrollar primero el conocimiento técnico del producto y luego ampliar la prospección a medida que aumenta la confianza',fit:56,styles:['technical','strategic']},
        {en:'Start with inbound and marketing leads, then broaden outbound activity with market knowledge',es:'Empezar con oportunidades entrantes y de marketing, y ampliar después la actividad saliente con mayor conocimiento del mercado',fit:22,styles:['strategic']}]},
    {id:4,weight:10,tierLabel:{en:'Opening doors',es:'Abrir puertas'},catLabel:{en:'Consultative selling',es:'Venta consultiva'},read:9,answer:25,
      en:'A facility manager says, “We already have a roofer and we are happy with them.” What is your strongest next move?',es:'Un gerente de instalaciones dice: “Ya tenemos un techador y estamos satisfechos con ellos”. ¿Cuál es tu mejor siguiente paso?',options:[
        {en:'Respect the incumbent, explore future needs and timing, and earn permission for the next useful conversation',es:'Respetar al proveedor actual, explorar necesidades y tiempos futuros y obtener permiso para la próxima conversación útil',fit:100,styles:['relationship','strategic']},
        {en:'Give a concise Danco value case and ask to quote the next suitable opportunity',es:'Presentar brevemente el valor de Danco y pedir cotizar la próxima oportunidad adecuada',fit:76,styles:['driver','relationship']},
        {en:'Test the incumbent’s performance directly and identify gaps Danco could improve',es:'Cuestionar directamente el desempeño del proveedor actual e identificar áreas que Danco podría mejorar',fit:24,styles:['driver']},
        {en:'Leave useful information and stay available until a requirement creates an opening',es:'Dejar información útil y mantenerse disponible hasta que una necesidad genere una oportunidad',fit:38,styles:['relationship']}]},
    {id:5,weight:10,tierLabel:{en:'Technical credibility',es:'Credibilidad técnica'},catLabel:{en:'Technical selling',es:'Venta técnica'},read:9,answer:25,
      en:'A prospect asks a technical roofing question you cannot answer confidently. What do you do?',es:'Un prospecto hace una pregunta técnica de techado que no puedes responder con confianza. ¿Qué haces?',options:[
        {en:'Clarify the need, involve the right Danco specialist, and return quickly with an accurate answer',es:'Aclarar la necesidad, involucrar al especialista adecuado de Danco y responder pronto con precisión',fit:100,styles:['technical','relationship']},
        {en:'Research it personally and respond once I can support the answer confidently',es:'Investigarla personalmente y responder cuando pueda respaldar la respuesta con confianza',fit:78,styles:['technical','strategic']},
        {en:'Give my best professional answer now and follow up if more detail is needed',es:'Dar ahora mi mejor respuesta profesional y ampliar la información si hace falta',fit:18,styles:['driver']},
        {en:'Refocus on commercial priorities and bring technical detail in later if required',es:'Volver a las prioridades comerciales e incorporar el detalle técnico después si es necesario',fit:32,styles:['relationship','driver']}]},
    {id:6,weight:10,tierLabel:{en:'Commercial judgment',es:'Criterio comercial'},catLabel:{en:'Value & margin',es:'Valor y margen'},read:9,answer:25,
      en:'A strong prospect says Danco is more expensive than another proposal. What is your preferred response?',es:'Un prospecto sólido dice que Danco es más caro que otra propuesta. ¿Cuál es tu respuesta preferida?',options:[
        {en:'Compare scope, value and risk, offer sensible options, and protect value before considering discount',es:'Comparar alcance, valor y riesgo, ofrecer opciones sensatas y proteger el valor antes de considerar un descuento',fit:100,styles:['strategic','technical']},
        {en:'Use a controlled discount when account value justifies winning the first project',es:'Usar un descuento controlado cuando el valor de la cuenta justifique ganar el primer proyecto',fit:58,styles:['driver']},
        {en:'Hold the price and reinforce Danco quality, service and overall value',es:'Mantener el precio y reforzar la calidad, el servicio y el valor general de Danco',fit:52,styles:['driver','technical']},
        {en:'Escalate pricing tradeoffs to management before changing the commercial position',es:'Escalar las decisiones de precio a la dirección antes de cambiar la posición comercial',fit:46,styles:['strategic']}]},
    {id:7,weight:8,tierLabel:{en:'Sales persistence',es:'Persistencia comercial'},catLabel:{en:'Long-cycle follow-up',es:'Seguimiento de ciclo largo'},read:9,answer:25,
      en:'A prospect is interested but has no roofing project for the next six months. How do you manage the opportunity?',es:'Un prospecto está interesado pero no tiene proyecto de techado durante los próximos seis meses. ¿Cómo gestionas la oportunidad?',options:[
        {en:'Agree the next step and date, maintain relevant contact, and keep the CRM stage accurate',es:'Acordar el siguiente paso y fecha, mantener un contacto relevante y conservar correcta la etapa en el CRM',fit:100,styles:['strategic','relationship']},
        {en:'Create earlier reasons to engage, such as inspections, budgeting or planning conversations',es:'Crear razones para participar antes, como inspecciones, presupuestos o conversaciones de planificación',fit:56,styles:['driver']},
        {en:'Check in periodically and let the relationship signal when timing becomes active',es:'Mantener contacto periódico y dejar que la relación indique cuándo el momento se vuelve activo',fit:68,styles:['relationship']},
        {en:'Reduce active follow-up and re-engage closer to the likely project timing',es:'Reducir el seguimiento activo y retomar el contacto más cerca del momento probable del proyecto',fit:22,styles:['strategic']}]},
    {id:8,weight:8,tierLabel:{en:'Pipeline discipline',es:'Disciplina de cartera'},catLabel:{en:'CRM & forecasting',es:'CRM y previsión'},read:9,answer:25,
      en:'Which approach best describes how you manage a commercial sales pipeline?',es:'¿Qué enfoque describe mejor cómo gestionas una cartera de ventas comerciales?',options:[
        {en:'Track stage, value, probability, decision timing and next action, and review the pipeline weekly',es:'Registrar etapa, valor, probabilidad, momento de decisión y siguiente acción, y revisar la cartera semanalmente',fit:100,styles:['strategic','technical']},
        {en:'Keep detailed notes on priority accounts and use CRM for key opportunities',es:'Mantener notas detalladas de cuentas prioritarias y usar el CRM para oportunidades clave',fit:70,styles:['relationship','strategic']},
        {en:'Manage mainly through personal notes, calendar and direct customer knowledge',es:'Gestionar principalmente mediante notas personales, calendario y conocimiento directo del cliente',fit:36,styles:['relationship']},
        {en:'Update CRM at major milestones such as quote, win or loss',es:'Actualizar el CRM en hitos principales como cotización, ganancia o pérdida',fit:12,styles:['driver']}]},
    {id:9,weight:6,tierLabel:{en:'Performance under pressure',es:'Rendimiento bajo presión'},catLabel:{en:'Target response',es:'Respuesta a objetivos'},read:9,answer:25,
      en:'You are behind target halfway through the quarter. What is the strongest response?',es:'Vas por debajo del objetivo a mitad del trimestre. ¿Cuál es la respuesta más sólida?',options:[
        {en:'Review conversion and pipeline gaps, protect likely deals, reactivate relationships and add targeted prospecting',es:'Revisar brechas de conversión y cartera, proteger negocios probables, reactivar relaciones y añadir prospección dirigida',fit:100,styles:['strategic','driver']},
        {en:'Increase activity through more calls, visits and direct asks for business',es:'Aumentar la actividad con más llamadas, visitas y solicitudes directas de negocio',fit:72,styles:['driver']},
        {en:'Focus on warm accounts most likely to produce near-term revenue',es:'Centrarse en cuentas activas con mayor probabilidad de generar ingresos a corto plazo',fit:66,styles:['relationship']},
        {en:'Improve proposals and technical detail to strengthen current opportunity conversion',es:'Mejorar propuestas y detalle técnico para aumentar la conversión de oportunidades actuales',fit:48,styles:['technical','strategic']}]},
    {id:10,weight:6,tierLabel:{en:'Trust & judgment',es:'Confianza y criterio'},catLabel:{en:'Professional integrity',es:'Integridad profesional'},read:9,answer:25,
      en:'A client asks you to promise a mobilization date or scope commitment that operations have not confirmed. What do you do?',es:'Un cliente te pide prometer una fecha de movilización o compromiso de alcance que operaciones no ha confirmado. ¿Qué haces?',options:[
        {en:'State what is confirmed, clarify the priority, involve operations, and offer an achievable alternative',es:'Indicar lo confirmado, aclarar la prioridad, involucrar a operaciones y ofrecer una alternativa viable',fit:100,styles:['technical','relationship']},
        {en:'Make the commitment to secure the opportunity, then solve delivery internally',es:'Hacer el compromiso para asegurar la oportunidad y resolver después la entrega internamente',fit:16,styles:['driver']},
        {en:'Keep the response flexible until operations can confirm the details',es:'Mantener la respuesta flexible hasta que operaciones pueda confirmar los detalles',fit:34,styles:['relationship']},
        {en:'Hold the commitment until operations confirms scope and timing',es:'Esperar para comprometerse hasta que operaciones confirme alcance y tiempos',fit:62,styles:['technical','strategic']}]}
  ];

  const $ = id => document.getElementById(id);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const SCREENS = ['invite-welcome-screen','language-screen','journey-choice-screen','setup-screen','profile-intro-screen','profile-screen','instructions-screen','knowledge-screen','result-screen'];
  let settings = loadJson(SETTINGS_KEY, {lang:'en',audio:false,supportReason:0,deviceMode:'choice',voiceMode:'recorded'});
  settings.voiceMode=['recorded','device'].includes(settings.voiceMode)?settings.voiceMode:'recorded';
  const RECORDED_AUDIO_DEFAULT_KEY='dancoAssessment_recordedAudioDefault_v36';
  if(localStorage.getItem(RECORDED_AUDIO_DEFAULT_KEY)!=='1'){settings.voiceMode='recorded';localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));localStorage.setItem(RECORDED_AUDIO_DEFAULT_KEY,'1');}
  settings.deviceMode=['assessment','application','choice'].includes(settings.deviceMode)?settings.deviceMode:'choice';
  let session = loadJson(SESSION_KEY, null);
  let profileIndex = 0;
  let timer = null;
  let phase = 'review';
  let phaseRemaining = 0;
  let optionLocked = false;
  let profileSelectedIndex = null;
  let knowledgeSelectedIndex = null;
  let currentDisplayOptions = [];
  let adminAuthenticated = false;
  let adminAccessPin = '';
  let currentSharedReference = '';
  let currentQueueStatus = 'pending';
  let sharedQueueRecords = [];
  let sharedQueueGroups = {};
  let salesLeaderboardRows = [];
  let salesLeaderboardSort = {key:'overall',dir:'desc'};
  let backgroundReportRecords = [];
  let currentLoadedRecord = null;
  let currentBackgroundScreening = null;
  let backgroundQuote = null;
  let currentEmploymentContract = null;
  let contractEligibilityConfirmed = false;
  let contractEligibilityBasis = '';
  let ssnOverrideState = { approved:false, valueKey:'', reason:'', other:'' };
  let nativeFullscreenActive = false;
  let dancoPlusPollTimer = null;
  let dancoPlusRequestContext = '';
  const INVITE_TOKEN = new URLSearchParams(location.search).get('invite')||'';
  let activeInvite = null;
  let inviteBootError = '';
  let pendingAccessibleCommit = false;
  let currentBackgroundReportRecord = null;

  function t(key, ...args){ const value = TEXT[settings.lang]?.[key] ?? TEXT.en[key] ?? key; return typeof value === 'function' ? value(...args) : value; }
  function loadJson(key, fallback){ try{ const raw=localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }catch(_){ return fallback; } }
  function saveJson(key, value){ try{ localStorage.setItem(key, JSON.stringify(value)); }catch(_){} }
  function saveSettings(){ saveJson(SETTINGS_KEY, settings); }
  function saveSession(){ if(session) saveJson(SESSION_KEY, session); }
  function storedApplications(){ const value=loadJson(APPLICATIONS_KEY,[]); return Array.isArray(value)?value:[]; }
  async function sharedRequest(path,payload){
    const response=await fetch(`${SHARED_SERVICE_URL}${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    let data={}; try{data=await response.json();}catch(_){}
    if(!response.ok) throw new Error(data.error||'The shared submission service is unavailable.');
    return data;
  }

  async function dancoPlusRequest(payload){
    const response=await fetch(DANCO_PLUS_ACCESS_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    let data={};try{data=await response.json();}catch(_){}
    if(!response.ok)throw new Error(data.error||'The Danco+ approval service is unavailable.');
    return data;
  }
  async function inviteRequest(payload){
    const response=await fetch(DANCO_INVITES_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    let data={};try{data=await response.json();}catch(_){}
    if(!response.ok)throw new Error(data.error||'The candidate-link service is unavailable.');
    return data;
  }
  function inviteLiveMode(){return !!activeInvite&&!!INVITE_TOKEN;}
  function inviteReferenceLabel(reference){return inviteLiveMode()&&reference?`LINK-${reference}`:reference||'';}
  function isInviteRecord(record){return record?.application?.inviteSource===true;}
  function displayRecordReference(record){const ref=record?.reference||record?.code||'';return isInviteRecord(record)&&ref?`LINK-${ref}`:ref;}
  function prepareInviteWelcome(){
    if(!activeInvite)return;
    const named=String(activeInvite.inviteeName||'').trim();
    $('invite-welcome-title').textContent=named?`Hello, ${named}`:'Welcome to Danco';
    $('invite-welcome-role').textContent=activeInvite.role||'Invited role';
    $('invite-welcome-message').textContent=named
      ? `The Danco team would like you to complete an application and assessment for the ${activeInvite.role} role. The process includes a short work-style section followed by the role assessment.`
      : `The Danco team would like you to complete an application and assessment for the ${activeInvite.role} role. The process includes a short work-style section followed by the role assessment.`;
    const langLead=document.querySelector('#language-screen .lead');if(langLead)langLead.textContent='Choose your preferred language to continue your private Danco candidate application and role assessment.';
    const langEyebrow=$('product-eyebrow');if(langEyebrow)langEyebrow.textContent='DANCO ROOFING SERVICES, INC. · CANDIDATE APPLICATION & ASSESSMENT';
    const button=$('invite-welcome-continue');
    if(activeInvite.blockedStarted){
      $('invite-welcome-title').textContent='Assessment already started';
      $('invite-welcome-message').textContent='This one-use link has already entered the timed assessment and cannot restart from the beginning. If the original assessment cannot be resumed on this device, please contact Danco for a new link.';
      button.disabled=true;button.textContent='Contact Danco for a new link';
    }else if(activeInvite.status==='cancelled'){
      $('invite-welcome-title').textContent='Link no longer available';
      $('invite-welcome-message').textContent='This candidate link has been cancelled. Please contact Danco if you need a replacement link.';
      button.disabled=true;button.textContent='Link unavailable';
    }else{button.disabled=false;button.textContent='Continue to language selection';}
  }
  async function handleInviteBoot(){
    if(!INVITE_TOKEN)return false;
    try{
      const response=await inviteRequest({action:'status',token:INVITE_TOKEN});activeInvite=response.invite||null;
      if(!activeInvite)throw new Error('This candidate link is unavailable.');
      document.body.classList.add('invite-live-mode');
      document.title='Danco Candidate Application & Assessment';
      if(['completed','submitted'].includes(activeInvite.status)&&activeInvite.resultCode){
        const decoded=decodeResult(activeInvite.resultCode),draft=activeInvite.draftRecord&&typeof activeInvite.draftRecord==='object'?activeInvite.draftRecord:{};
        const draftAssessment=draft.assessment&&typeof draft.assessment==='object'?draft.assessment:{};
        session={status:'complete',mode:'application',name:draft.name||activeInvite.inviteeName||'Candidate',reference:'',application:{...(draft.application||{}),role:activeInvite.role,inviteSource:true,inviteId:activeInvite.id,privacyAcknowledged:true},applicationSubmitted:activeInvite.status==='submitted'||!!activeInvite.submissionReference,submissionReference:activeInvite.submissionReference||'',assessmentTrack:activeInvite.role==='Commercial Account Manager'?'account_manager':'roofing',lang:draftAssessment.lang||decoded.lang||settings.lang,audio:typeof draftAssessment.audio==='boolean'?draftAssessment.audio:!!decoded.audio,supportReason:draftAssessment.supportReason??decoded.supportReason??0,profileSkipped:typeof draftAssessment.profileSkipped==='boolean'?draftAssessment.profileSkipped:!!decoded.profileSkipped,profileAnswers:Array.isArray(draftAssessment.profileAnswers)?draftAssessment.profileAnswers:(decoded.profileAnswers||[]),knowledgeAnswers:Array.isArray(draftAssessment.knowledgeAnswers)?draftAssessment.knowledgeAnswers:(decoded.knowledgeAnswers||[]),knowledgeIndex:10,resultCode:activeInvite.resultCode,inviteId:activeInvite.id,inviteToken:INVITE_TOKEN,trialConsumed:true};
        saveSession();return true;
      }
      if(activeInvite.status==='started'){
        const resumable=session?.inviteId===activeInvite.id&&session?.status==='knowledge';
        if(!resumable)activeInvite.blockedStarted=true;
        return true;
      }
      if(activeInvite.status==='created'){
        localStorage.removeItem(SESSION_KEY);session=null;
        return true;
      }
      return true;
    }catch(error){
      inviteBootError=error.message||'This candidate link is unavailable.';
      activeInvite={id:'',role:'Candidate role',inviteeName:'',status:'cancelled'};
      document.body.classList.add('invite-live-mode');prepareInviteWelcome();
      $('invite-welcome-message').textContent=inviteBootError;return true;
    }
  }
  function getDeviceId(){
    let id=localStorage.getItem(DEVICE_ID_KEY)||'';
    if(!id){id=(crypto.randomUUID?.()||`danco-${Date.now()}-${Math.random().toString(36).slice(2)}`);localStorage.setItem(DEVICE_ID_KEY,id);}
    return id;
  }
  function dancoPlusApproval(){return loadJson(DANCO_PLUS_APPROVAL_KEY,{status:'none'});}
  function ownerPresentationMode(){return localStorage.getItem(OWNER_PRESENTATION_KEY)==='standard'?'standard':'advanced';}
  function dancoPlusActive(){return isOwner()?ownerPresentationMode()==='advanced':dancoPlusApproval().status==='approved'&&localStorage.getItem(DANCO_PLUS_USER_PRESENTATION_KEY)!=='standard';}
  function dancoPlusRequested(){return loadJson(DANCO_PLUS_REQUEST_KEY,{status:'none'});}
  function ownerSession(){return loadJson(OWNER_SESSION_KEY,null);}
  function saveOwnerSession(token,expiresInMs){saveJson(OWNER_SESSION_KEY,{token,expiresAt:Date.now()+Number(expiresInMs||0)});}
  function currentOwnerToken(){const x=ownerSession();return x&&x.token&&Number(x.expiresAt||0)>Date.now()?x.token:'';}
  function advancedQueueStatus(status){return ['background_to_action','background_eligible','background_not_eligible','employment_contracts','signed_employment_contracts'].includes(status);}
  function suggestedDancoPlusName(){return String(currentLoadedRecord?.name||session?.name||'').trim();}
  function setBrowserIconForMode(active){
    const icon=document.querySelector('link[rel="icon"]');
    const appleIcon=document.querySelector('link[rel="apple-touch-icon"]');
    const theme=document.querySelector('meta[name="theme-color"]');
    if(icon)icon.href=active?'icon-danco-plus-192.png':'icon-192.png';
    if(appleIcon)appleIcon.href=active?'apple-touch-icon-danco-plus.png':'apple-touch-icon.png';
    if(theme)theme.content=active?'#082b58':'#0b3f89';
  }
  function applyDancoPlusMode(){
    const active=dancoPlusActive();
    document.body.classList.toggle('danco-plus-mode',active);
    document.body.classList.toggle('danco-standard-mode',!active);
    const badge=$('danco-plus-header-status');if(badge){badge.classList.toggle('active',active);badge.dataset.mode=active?'plus':'standard';badge.setAttribute('aria-pressed',String(active));badge.setAttribute('aria-label',active?'Danco Plus active. Switch to Standard mode':'Standard mode. Open or request Danco Plus');badge.title=active?'Danco+ active · tap for Standard':'Standard mode · tap to open or request Danco+';const stateLabel=badge.querySelector('.danco-plus-switch-state');if(stateLabel)stateLabel.textContent=active?'DANCO+':'STANDARD';}
    const eyebrow=$('product-eyebrow');if(eyebrow)eyebrow.innerHTML=inviteLiveMode()?'DANCO ROOFING SERVICES, INC. · CANDIDATE APPLICATION &amp; ASSESSMENT':active?'DANCO ROOFING SERVICES, INC. · <b>DANCO+</b> ADVANCED PROTOTYPE':'DANCO ROOFING SERVICES, INC. · WORKFORCE &amp; APPLICANT PROTOTYPE';
    const card=$('danco-plus-access-card'),state=$('danco-plus-access-state'),title=$('danco-plus-access-title'),copy=$('danco-plus-access-copy'),requestButton=$('request-danco-plus');
    if(card){card.classList.toggle('active',active);card.classList.toggle('owner-standard',isOwner()&&!active);}
    if(state)state.textContent=active?'ACTIVE':'STANDARD';
    if(title)title.textContent=active?'Danco+ advanced workflow is active':isOwner()?'Owner presentation is currently in Standard mode':'Advanced hiring tools are available to request';
    if(copy)copy.textContent=active?'Integrated screening demonstration, employment agreement creation and secure employment-file progression are enabled on this device.':isOwner()?'Use the owner presentation toggle below to switch into Danco+ without changing any trial access.':'The assessment, applications, DISC/work-style profiling and role-specific reports operate normally. Danco+ can be requested when you are ready to demonstrate the connected hiring workflow.';
    if(requestButton){requestButton.hidden=active||isOwner();const req=dancoPlusRequested();requestButton.textContent=req.status==='pending'?'Danco+ request pending':'Request Danco+ trial';}
    const ownerPanel=$('owner-danco-plus-panel');if(ownerPanel)ownerPanel.hidden=!isOwner();
    $$('[data-owner-product-mode]').forEach(button=>button.classList.toggle('active',button.dataset.ownerProductMode===(active?'advanced':'standard')));
    $$('.advanced-queue-tab,[data-advanced-feature]').forEach(el=>el.classList.toggle('advanced-locked',!active));
    setBrowserIconForMode(active);
    if(!active&&advancedQueueStatus(currentQueueStatus))currentQueueStatus='pending';
    if(adminAuthenticated&&currentLoadedRecord){renderBackgroundActions(currentLoadedRecord);renderEmploymentContractActions(currentLoadedRecord);}
  }
  function requireDancoPlus(feature='advanced hiring workflow'){
    if(dancoPlusActive())return true;
    openDancoPlusRequest(feature);return false;
  }
  function openDancoPlusRequest(feature=''){
    dancoPlusRequestContext=feature||'';
    const input=$('danco-plus-request-name');if(input)input.value=suggestedDancoPlusName();
    const error=$('danco-plus-request-error');if(error)error.textContent='';
    const status=$('danco-plus-request-status');if(status){status.hidden=true;status.textContent='';}
    openModal('danco-plus-request-modal');
  }
  async function submitDancoPlusRequest(){
    const name=$('danco-plus-request-name').value.trim(),error=$('danco-plus-request-error'),button=$('submit-danco-plus-request');error.textContent='';
    if(!name){error.textContent='Enter the name to show on the owner approval request.';return;}
    button.disabled=true;button.textContent='Sending request…';
    try{
      const response=await dancoPlusRequest({action:'request',deviceId:getDeviceId(),requesterName:name});const req=response.request||{};
      saveJson(DANCO_PLUS_REQUEST_KEY,{status:req.status||'pending',requesterName:name,requestedAt:req.requested_at||new Date().toISOString()});
      const status=$('danco-plus-request-status');status.hidden=false;status.innerHTML=req.status==='approved'?'<b>Approved.</b> Danco+ is activating on this device.':'<b>Request sent.</b> The Danco owner can approve this device from the owner-only dashboard. This screen will unlock automatically after approval.';
      if(req.status==='approved'){saveJson(DANCO_PLUS_APPROVAL_KEY,{status:'approved',approvedAt:req.decided_at||new Date().toISOString()});applyDancoPlusMode();showDancoPlusWelcomeIfNeeded();}
      else startDancoPlusPolling();applyDancoPlusMode();
    }catch(e){error.textContent=e.message;}
    finally{button.disabled=false;button.textContent='Send request to owner';}
  }
  function showDancoPlusWelcomeIfNeeded(){
    if(isOwner()||!dancoPlusActive()||localStorage.getItem(DANCO_PLUS_INTRO_KEY)==='1')return;
    openModal('danco-plus-welcome-modal');
  }
  async function refreshDancoPlusStatus({welcome=true}={}){
    if(isOwner()){applyDancoPlusMode();return;}
    try{
      const response=await dancoPlusRequest({action:'status',deviceId:getDeviceId()});const status=response.status||'none';
      if(status==='approved'){
        const wasActive=dancoPlusApproval().status==='approved';saveJson(DANCO_PLUS_APPROVAL_KEY,{status:'approved',approvedAt:response.request?.decided_at||new Date().toISOString()});saveJson(DANCO_PLUS_REQUEST_KEY,{status:'approved',requesterName:response.request?.requester_name||suggestedDancoPlusName()});applyDancoPlusMode();if(!wasActive&&welcome)showDancoPlusWelcomeIfNeeded();stopDancoPlusPolling();
      }else{
        if(status==='pending')saveJson(DANCO_PLUS_REQUEST_KEY,{status:'pending',requesterName:response.request?.requester_name||suggestedDancoPlusName(),requestedAt:response.request?.requested_at});
        if(['denied','revoked'].includes(status)){saveJson(DANCO_PLUS_APPROVAL_KEY,{status});saveJson(DANCO_PLUS_REQUEST_KEY,{status});}
        applyDancoPlusMode();if(status==='pending')startDancoPlusPolling();
      }
    }catch(_){applyDancoPlusMode();}
  }
  function startDancoPlusPolling(){if(dancoPlusPollTimer)return;dancoPlusPollTimer=setInterval(()=>refreshDancoPlusStatus({welcome:true}),12000);}
  function stopDancoPlusPolling(){if(dancoPlusPollTimer){clearInterval(dancoPlusPollTimer);dancoPlusPollTimer=null;}}
  async function establishOwnerSession(ownerCode){
    const response=await dancoPlusRequest({action:'owner_login',ownerCode,deviceId:getDeviceId()});if(!response.ownerToken)throw new Error('Owner approval session could not be established.');saveOwnerSession(response.ownerToken,response.expiresInMs);return response.ownerToken;
  }
  async function refreshOwnerRequests(){
    if(!isOwner())return;const list=$('owner-request-list'),error=$('owner-plus-error'),verify=$('verify-owner-session');if(error)error.textContent='';
    const token=currentOwnerToken();if(!token){if(list)list.innerHTML='<div class="owner-session-note"><b>One-time owner verification required</b><span>Verify the existing owner access code to load and approve Danco+ device requests.</span></div>';if(verify)verify.hidden=false;return;}
    if(verify)verify.hidden=true;if(list)list.innerHTML='<p class="fine">Loading advanced trial requests…</p>';
    try{
      const response=await dancoPlusRequest({action:'owner_list',ownerToken:token});const rows=response.requests||[];
      if(!rows.length){list.innerHTML='<p class="fine">No Danco+ requests have been submitted yet.</p>';return;}
      list.innerHTML=rows.map(row=>`<article class="owner-request-row ${escapeHtml(row.status)}"><div><b>${escapeHtml(row.requester_name||'Unnamed requester')}</b><span>Device ${escapeHtml(String(row.device_id||'').slice(-8).toUpperCase())} · ${escapeHtml(new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short'}).format(new Date(row.requested_at)))}</span></div><strong>${escapeHtml(String(row.status||'pending').toUpperCase())}</strong>${row.status==='pending'?`<div class="owner-request-actions"><button class="button button-primary" type="button" data-plus-decision="approved" data-plus-request-id="${escapeHtml(row.id)}">Approve</button><button class="button button-secondary" type="button" data-plus-decision="denied" data-plus-request-id="${escapeHtml(row.id)}">Decline</button></div>`:row.status==='approved'?`<div class="owner-request-actions"><button class="button button-secondary" type="button" data-plus-decision="revoked" data-plus-request-id="${escapeHtml(row.id)}">Revoke</button></div>`:''}</article>`).join('');
      $$('[data-plus-decision]').forEach(button=>button.addEventListener('click',()=>ownerDancoPlusDecision(button.dataset.plusRequestId,button.dataset.plusDecision)));
    }catch(e){if(error)error.textContent=e.message;if(String(e.message).toLowerCase().includes('owner session')){localStorage.removeItem(OWNER_SESSION_KEY);if(verify)verify.hidden=false;}}
  }
  async function ownerDancoPlusDecision(requestId,decision){
    const token=currentOwnerToken();if(!token){openModal('owner-verify-modal');return;}
    try{await dancoPlusRequest({action:'owner_decision',ownerToken:token,requestId,decision,decidedBy:'Danco owner'});toast(decision==='approved'?'Danco+ trial approved for that device.':decision==='revoked'?'Danco+ access revoked.':'Danco+ request declined.');await refreshOwnerRequests();}catch(e){$('owner-plus-error').textContent=e.message;}
  }
  async function createCandidateInvite(){
    const error=$('owner-invite-error'),output=$('owner-invite-output'),button=$('create-candidate-link');if(error)error.textContent='';
    const ownerToken=currentOwnerToken();if(!ownerToken){openModal('owner-verify-modal');return;}
    const role=$('owner-invite-role')?.value||'',inviteeName=$('owner-invite-name')?.value.trim()||'';
    button.disabled=true;button.textContent='Creating secure link…';
    try{
      const response=await inviteRequest({action:'owner_create',ownerToken,role,inviteeName});if(!response.token)throw new Error('Candidate link could not be created.');
      const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('invite',response.token);
      $('owner-invite-link').value=url.toString();output.hidden=false;toast('One-use candidate link created.');
    }catch(e){if(error)error.textContent=e.message||'Unable to create candidate link.';}
    finally{button.disabled=false;button.textContent='Create one-use candidate link';}
  }
  async function copyCandidateInvite(){
    const value=$('owner-invite-link')?.value||'';if(!value)return;
    try{await navigator.clipboard.writeText(value);toast('Candidate link copied.');}catch(_){$('owner-invite-link')?.select();toast('Select and copy the candidate link.');}
  }
  function setOwnerProductMode(mode){if(!isOwner())return;localStorage.setItem(OWNER_PRESENTATION_KEY,mode==='standard'?'standard':'advanced');applyDancoPlusMode();if(adminAuthenticated&&currentSharedReference)reloadCurrentSharedRecord().catch(()=>{});toast(`Presentation mode: ${mode==='standard'?'Standard':'Danco+'}.`);}
  function toggleHeaderDancoPlus(){
    const currentlyActive=dancoPlusActive();
    if(isOwner()){setOwnerProductMode(currentlyActive?'standard':'advanced');return;}
    const approved=dancoPlusApproval().status==='approved';
    if(!approved){openDancoPlusRequest('Danco+ advanced hiring workflow');return;}
    localStorage.setItem(DANCO_PLUS_USER_PRESENTATION_KEY,currentlyActive?'standard':'advanced');
    applyDancoPlusMode();
    if(adminAuthenticated&&currentSharedReference)reloadCurrentSharedRecord().catch(()=>{});
    toast(currentlyActive?'Standard mode active. Tap STANDARD to return to Danco+.':'Danco+ advanced mode active.');
  }
  function escapeHtml(value){ return String(value ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function normalizeCode(value){ return String(value||'').toUpperCase().replace(/[^A-Z0-9]/g,''); }
  function accessHash(value){ let h=0x811c9dc5; for(const c of normalizeCode(value)){ h^=c.charCodeAt(0); h=Math.imul(h,0x01000193)>>>0; } return h.toString(16).toUpperCase().padStart(8,'0'); }
  function isOwner(){ return localStorage.getItem(OWNER_KEY)==='1'; }
  function trialHash(){ const h=localStorage.getItem(TRIAL_KEY)||''; return TRIAL_HASHES.has(h)?h:''; }
  function trialUsage(){ return loadJson(TRIAL_USAGE_KEY, {}); }
  function trialRemaining(){ const h=trialHash(); if(!h) return 0; const usage=trialUsage(); return Math.max(0, Number(usage[h]?.remaining ?? 0)); }
  function accessMode(){ if(inviteLiveMode()) return 'invite'; if(isOwner()) return 'owner'; if(trialHash()) return 'trial'; return 'locked'; }
  function canBegin(){ return inviteLiveMode() || isOwner() || (trialHash() && trialRemaining()>0); }
  function consumeTrialCompletion(){
    if(inviteLiveMode() || isOwner() || session?.trialConsumed) return;
    const h=trialHash(); if(!h) return;
    const usage=trialUsage(); if(!usage[h]) usage[h]={remaining:TRIAL_RUNS,activatedAt:Date.now()};
    usage[h].remaining=Math.max(0,Number(usage[h].remaining||0)-1); usage[h].lastCompletedAt=Date.now();
    saveJson(TRIAL_USAGE_KEY,usage); session.trialConsumed=true;
  }
  function activateCode(raw){
    const h=accessHash(raw);
    if(h===OWNER_HASH){ localStorage.setItem(OWNER_KEY,'1'); applyAccessState(); return {mode:'owner'}; }
    if(!TRIAL_HASHES.has(h)) throw new Error(t('invalidCode'));
    const usage=trialUsage(); if(!usage[h]) usage[h]={remaining:TRIAL_RUNS,activatedAt:Date.now()};
    saveJson(TRIAL_USAGE_KEY,usage); localStorage.setItem(TRIAL_KEY,h); applyAccessState();
    return {mode:'trial',remaining:Math.max(0,Number(usage[h].remaining||0))};
  }

  function applyAccessState(){
    const mode=accessMode(); const remaining=trialRemaining();
    document.body.classList.toggle('owner-access',mode==='owner');
    document.body.classList.toggle('invite-live-mode',mode==='invite');
    document.body.classList.toggle('prototype-locked',mode==='locked');
    document.body.classList.toggle('prototype-trial',mode==='trial');
    $('access-status').textContent=mode==='invite'?'CANDIDATE LINK':mode==='owner'?'FULL ACCESS':mode==='trial'?`PROTOTYPE TRIAL · ${remaining}`:'PROTOTYPE';
    $('locked-callout').classList.toggle('hidden',mode!=='locked');
    renderSetupAccess(); applyDancoPlusMode();
  }
  function renderSetupAccess(){
    const card=$('setup-access-card'); if(!card) return;
    const mode=accessMode(); card.className=`access-card ${mode==='locked'?'locked':mode==='trial'?'trial':mode==='invite'?'invite':''}`;
    if(mode==='invite') card.innerHTML='<b>Private Danco candidate link</b><span>This one-use link is authorized for the invited role. Complete the application, work-style profile and assessment, then submit once for Danco review.</span>';
    else if(mode==='owner') card.innerHTML=`<b>${escapeHtml(t('accessOwnerTitle'))}</b>${escapeHtml(t('accessOwnerCopy'))}`;
    else if(mode==='trial') card.innerHTML=`<b>${escapeHtml(t('accessTrialTitle'))}</b>${escapeHtml(t('accessTrialCopy',trialRemaining()))}`;
    else card.innerHTML=`<b>${escapeHtml(t('accessLockedTitle'))}</b>${escapeHtml(t('accessLockedCopy'))}`;
  }

  function setLanguage(lang){
    settings.lang=lang==='es'?'es':'en'; saveSettings(); document.documentElement.lang=settings.lang;
    $$('[data-i18n]').forEach(el=>{ const value=t(el.dataset.i18n); if(typeof value==='string') el.textContent=value; });
    $('candidate-name').placeholder=t('namePlaceholder'); $('unlock-code').placeholder=t('codePlaceholder'); if($('background-consent-reason')) $('background-consent-reason').placeholder=t('backgroundReasonPlaceholder');
    $('language-toggle').textContent=settings.lang==='en'?'ES':'EN';
    const helper=settings.lang==='en'?'danco-helper-english.png':'danco-helper-spanish.png';
    const secondary=settings.lang==='en'?'danco-helper-spanish.png':'danco-helper-english.png';
    ['setup-helper','profile-intro-helper','instructions-helper','help-helper'].forEach(id=>$(id).src=helper);
    ['setup-helper-secondary','profile-intro-helper-secondary','instructions-helper-secondary','help-helper-secondary'].forEach(id=>$(id).src=secondary);
    $$('[data-helper-duo]').forEach(duo=>{
      const portraits=duo.querySelectorAll('.helper-portrait');
      portraits.forEach((portrait,index)=>portrait.classList.toggle('is-primary',settings.lang==='en'?index===0:index===1));
    });
    $('result-helper-english').classList.toggle('secondary-language',settings.lang!=='en');
    $('result-helper-spanish').classList.toggle('secondary-language',settings.lang!=='es');
    $('help-tab').classList.toggle('right',settings.lang==='es'); $('help-drawer').classList.toggle('right',settings.lang==='es');
    renderSetupAccess(); applyProductMode(); renderAudioSupportControls();
  }
  function activeProductMode(){ return inviteLiveMode()?'application':session?.mode==='application'?'application':'assessment'; }
  function normaliseDeviceMode(value){ return ['assessment','application','choice'].includes(value)?value:'choice'; }
  function normaliseSupportReason(value){ const reason=Number(value||0); return reason>=1&&reason<=3?reason:0; }
  function currentSupportReason(){
    const source=session&&session.status!=='setup'?session:settings;
    return source?.audio?normaliseSupportReason(source.supportReason):0;
  }
  function accessibilitySupportActive(){ const reason=currentSupportReason(); return reason===2||reason===3; }
  function supportReportInfo(data){
    if(!data?.audio) return {label:'No audio support',detail:''};
    const reason=normaliseSupportReason(data.supportReason);
    if(reason===2) return {label:'Reading support requested',detail:'Question narration and unlimited repeat were enabled before answers were revealed. The 60-second answer timer started only after Reveal answers was selected.'};
    if(reason===3) return {label:'Sight support requested',detail:'Question narration and unlimited repeat were enabled before answers were revealed. The 60-second answer timer started only after Reveal answers was selected.'};
    return {label:'Spoken-guidance preference',detail:'Recorded narration was enabled without additional accessibility time.'};
  }
  function renderAudioSupportControls(){
    const reason=normaliseSupportReason(settings.supportReason);
    $$('.setup-choice').forEach(button=>button.classList.toggle('selected',(button.dataset.audio==='on')===settings.audio));
    const reasonFieldset=$('support-reason-fieldset'); if(reasonFieldset) reasonFieldset.hidden=!settings.audio;
    $$('[data-support-reason]').forEach(button=>{const selected=Number(button.dataset.supportReason)===reason;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
    if($('audio-toggle')) $('audio-toggle').textContent=settings.audio?'🔊':'🔇';
    if($('accessibility-notice')) $('accessibility-notice').hidden=!accessibilitySupportActive();
  }
  function setAudioSupport(enabled,{askReason=false}={}){
    settings.audio=!!enabled;
    if(!settings.audio) settings.supportReason=0;
    else if(!normaliseSupportReason(settings.supportReason)&&!askReason) settings.supportReason=1;
    saveSettings();
    if(session&&session.status!=='complete'){
      session.audio=settings.audio;
      session.supportReason=settings.audio?normaliseSupportReason(settings.supportReason):0;
      saveSession();
    }
    renderAudioSupportControls();
    if(!settings.audio) cancelSpeech();
  }
  function selectAudioSupportReason(value){
    settings.audio=true; settings.supportReason=normaliseSupportReason(value); saveSettings();
    if(session&&session.status!=='complete'){session.audio=true;session.supportReason=settings.supportReason;saveSession();}
    renderAudioSupportControls(); $('setup-error').textContent='';
  }
  function applyProductMode(){
    const applicationMode=activeProductMode()==='application';
    const invited=inviteLiveMode();
    document.body.classList.toggle('application-mode',applicationMode);
    if($('application-fields')) $('application-fields').hidden=!applicationMode;
    if($('setup-title')) $('setup-title').textContent=invited?'Danco candidate application':t(applicationMode?'applicationSetupTitle':'setupTitle');
    const setupLead=document.querySelector('[data-i18n="setupLead"]'); if(setupLead) setupLead.textContent=invited?'Complete the details you are comfortable providing. Only your full name and the personal-information acknowledgement are required for this invitation.':t(applicationMode?'applicationSetupLead':'setupLead');
    const setupHelper=document.querySelector('[data-i18n="setupHelper"]'); if(setupHelper) setupHelper.textContent=invited?'I’ll guide you through the application, short work-style profile and role assessment. You can leave optional personal details blank.':t(applicationMode?'applicationSetupHelper':'setupHelper');
    if($('begin-beginner')) $('begin-beginner').textContent=invited?'Continue to work-style profile':t(applicationMode?'beginApplicationAssessment':'beginAssessment');
    const ssnStatus=$('ssn-status');if(ssnStatus&&invited)ssnStatus.textContent='Optional. You may leave this blank if you prefer not to provide it at this stage.';
    const consentNote=document.querySelector('[data-i18n="backgroundConsentNote"]');if(consentNote&&invited)consentNote.textContent='If your application progresses, Danco will confirm any required screening disclosure and authorization before a background check is requested.';
    const fieldsTitle=$('application-fields-title');if(fieldsTitle&&invited)fieldsTitle.textContent='Candidate application details';
    $$('[data-admin-device-mode]').forEach(button=>{ const active=button.dataset.adminDeviceMode===settings.deviceMode; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
  }
  function setDeviceMode(mode){
    settings.deviceMode=normaliseDeviceMode(mode); saveSettings();
    if(session&&session.status==='setup'){
      session.mode=settings.deviceMode==='choice'?'':settings.deviceMode;
      saveSession();
    }
    applyProductMode();
    const label=settings.deviceMode==='assessment'?'Workforce assessment only':settings.deviceMode==='application'?'Application only':'Choice of either';
    toast(`Device mode: ${label}.`);
  }
  function chooseJourney(mode){
    if(!session||session.status==='complete') newSession();
    session.mode=mode==='application'?'application':'assessment';
    session.lang=settings.lang; session.audio=settings.audio; saveSession();
    goToSetup();
  }
  function routeAfterLanguage(){
    if(!session||session.status==='complete') newSession();
    if(inviteLiveMode()){
      session.mode='application';session.application={...(session.application||{}),role:activeInvite.role,inviteSource:true,inviteId:activeInvite.id};session.name=session.name||activeInvite.inviteeName||'';saveSession();goToSetup();return;
    }
    if(settings.deviceMode==='choice'){
      session.mode=''; saveSession(); showScreen('journey-choice-screen'); maybeOfferDancoPitch(); return;
    }
    session.mode=settings.deviceMode; saveSession(); goToSetup(); maybeOfferDancoPitch();
  }
  function showScreen(id){
    SCREENS.forEach(screen=>$(screen).classList.toggle('active',screen===id));
    document.body.dataset.activeScreen=id;
    const helpVisible=['setup-screen','profile-intro-screen','profile-screen','instructions-screen','knowledge-screen'].includes(id);
    $('help-tab').classList.toggle('visible',helpVisible);
    window.scrollTo({top:0,behavior:'smooth'}); $('app').focus({preventScroll:true});
  }
  function openModal(id){ $(id).classList.add('open'); }
  function closeModal(id){ $(id).classList.remove('open'); }
  function toast(message){ const el=$('toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2300); }
  let lastRepeatableSpeech=[];
  let narrationAudio=null;
  let premiumNarrationAudio=null;
  let narrationPlayers={};
  let narrationQueue=[];
  let narrationQueueToken=0;
  let pitchIndex=0;
  let pitchPlaying=false;
  let pitchMuted=false;
  let pitchAdvanceTimer=null;
  let pitchSpeechToken=0;
  function dancoPitchVisual(type){
    const visual={
      journey:'<div class="pitch-flow"><span>APPLY</span><i>→</i><span>ASSESS</span><i>→</i><span>REVIEW</span><i>→</i><span>SCREEN</span><i>→</i><span>OFFER</span><i>→</i><span>PAYROLL</span></div>',
      record:'<div class="pitch-record"><b>LIVE CANDIDATE RECORD</b><div><span>Application</span><span>DISC</span><span>Role assessment</span><span>Review</span><span>Next action</span></div></div>',
      sales:'<div class="pitch-sales"><div class="pitch-score-mini"><b>86%</b><span>SALES SUITABILITY</span></div><div><span>Commercial judgment</span><i></i><span>Relationship value</span><i></i><span>Pipeline discipline</span><i></i></div></div>',
      interview:'<div class="pitch-interview"><b>INTERVIEW DIRECTION</b><span>Probe the sales pipeline</span><span>Test margin discipline</span><span>Validate relationships</span><span>Explore technical confidence</span></div>',
      screening:'<div class="pitch-screening"><div><small>BACKGROUND SCREEN</small><b>Vendor cost visible</b><span>Admin approval → request → status</span></div><strong>$59.99</strong></div>',
      contract:'<div class="pitch-contract"><div class="pitch-doc"><b>DANCO</b><span>Employment Agreement</span><i></i><i></i><i></i></div><div class="pitch-contract-arrow">→</div><div class="pitch-folder">SIGNED<br>EMPLOYMENT<br>FILE</div></div>',
      speed:'<div class="pitch-speed"><div><small>TRADITIONAL HANDOFFS</small><b>Forms → calls → re-entry → waiting</b></div><div><small>DANCO+</small><b>One record → next action</b></div></div>',
      attract:'<div class="pitch-attract"><div class="pitch-phone"><b>DANCO</b><span>Apply now</span><em>Commercial Account Manager</em><button>Start application</button></div><div><b>ONE SHAREABLE LINK</b><span>Professional · bilingual · role-specific</span></div></div>',
      human:'<div class="pitch-human"><div>DATA</div><i>+</i><div>JUDGMENT</div><i>=</i><strong>BETTER<br>DECISIONS</strong></div>',
      payroll:'<div class="pitch-payroll"><span>APPLICATION</span><i>✓</i><span>ASSESSMENT</span><i>✓</i><span>SCREENING</span><i>✓</i><span>AGREEMENT</span><i>✓</i><strong>PAYROLL READY</strong></div>'
    };
    return visual[type]||'';
  }
  function clearPitchAdvance(){ if(pitchAdvanceTimer){clearTimeout(pitchAdvanceTimer);pitchAdvanceTimer=null;} }
  function pitchUsVoices(){
    if(!('speechSynthesis' in window))return [];
    return speechSynthesis.getVoices().filter(v=>String(v.lang||'').toLowerCase().startsWith('en-us'));
  }
  function choosePitchVoice(speaker){
    const voices=pitchUsVoices(); if(!voices.length)return null;
    const preferred=speaker==='dan'?['Aaron','Alex','Fred','Tom','Matthew','Guy','Davis','Reed','Evan','Joey']:['Samantha','Ava','Allison','Susan','Zoe','Joelle','Nora','Nicky','Siri','Emma'];
    for(const name of preferred){const found=voices.find(v=>String(v.name||'').toLowerCase().includes(name.toLowerCase()));if(found)return found;}
    if(speaker==='brenda'&&voices.length>1)return voices[1];
    return voices[0];
  }
  function schedulePitchAdvance(line){
    clearPitchAdvance();
    const words=String(line||'').trim().split(/\s+/).filter(Boolean).length;
    pitchAdvanceTimer=setTimeout(()=>{if(pitchPlaying)advanceDancoPitch(1,true);},Math.max(4200,words*315));
  }
  function speakPitchScene(scene){
    pitchSpeechToken++; const token=pitchSpeechToken; clearPitchAdvance();
    if(premiumNarrationAudio){premiumNarrationAudio.pause();premiumNarrationAudio.src='';premiumNarrationAudio=null;}
    if('speechSynthesis' in window)speechSynthesis.cancel();
    if(pitchMuted){schedulePitchAdvance(scene.line);return;}
    const url=PREMIUM_PITCH_AUDIO[pitchIndex];
    if(!url){
      pitchPlaying=false;
      $('pitch-play-pause').textContent='Play';
      toast('Recorded Danco narration is unavailable for this section. Tap Play to retry.');
      return;
    }
    preloadPitchAudio(pitchIndex+1);
    try{
      const cached=pitchAudioPreload.get(pitchIndex);
      const audio=cached||new Audio(url);
      pitchAudioPreload.delete(pitchIndex);
      premiumNarrationAudio=audio;
      audio.preload='auto';
      audio.playbackRate=PITCH_AUDIO_PLAYBACK_RATE;
      audio.defaultPlaybackRate=PITCH_AUDIO_PLAYBACK_RATE;
      try{audio.preservesPitch=false;audio.webkitPreservesPitch=false;audio.mozPreservesPitch=false;}catch(_){ }
      let settled=false;
      const recordedFailure=()=>{
        if(settled||token!==pitchSpeechToken||!pitchPlaying)return;
        settled=true;
        if(premiumNarrationAudio===audio)premiumNarrationAudio=null;
        pitchPlaying=false;
        $('pitch-play-pause').textContent='Play';
        toast('Recorded Danco narration could not load. Tap Play to retry — device voice will not replace it.');
      };
      audio.onended=()=>{
        if(settled)return;
        settled=true;
        if(token===pitchSpeechToken&&pitchPlaying)advanceDancoPitch(1,true);
      };
      audio.onerror=recordedFailure;
      const playback=audio.play();
      if(playback?.catch)playback.catch(err=>{
        if(err&&err.name==='NotAllowedError'){
          if(token===pitchSpeechToken&&pitchPlaying){
            pitchPlaying=false;
            $('pitch-play-pause').textContent='Play';
            toast('Tap Play once to allow the recorded Danco presentation audio.');
          }
        }else recordedFailure();
      });
    }catch(_){
      pitchPlaying=false;
      $('pitch-play-pause').textContent='Play';
      toast('Recorded Danco narration could not start. Tap Play to retry.');
    }
  }

  function updatePitchCta(){
    const cta=$('pitch-primary-cta'); if(!cta)return;
    cta.textContent=dancoPlusActive()?'Explore Danco+':'Request Danco+ trial';
  }
  function renderDancoPitchScene({speakLine=true}={}){
    const scene=DANCO_PLUS_PITCH_SCENES[pitchIndex]; if(!scene)return;
    $('pitch-speaker').textContent=scene.speaker==='dan'?'DAN':'BRENDA';
    $('danco-plus-pitch-title').textContent=scene.headline; $('pitch-line').textContent=scene.line;
    $('pitch-feature-visual').innerHTML=dancoPitchVisual(scene.visual);
    $('pitch-scene-count').textContent=`${String(pitchIndex+1).padStart(2,'0')} / ${String(DANCO_PLUS_PITCH_SCENES.length).padStart(2,'0')}`;
    $('pitch-progress-bar').style.width=`${((pitchIndex+1)/DANCO_PLUS_PITCH_SCENES.length)*100}%`;
    $('pitch-character-dan').classList.toggle('active',scene.speaker==='dan');
    $('pitch-character-brenda').classList.toggle('active',scene.speaker==='brenda');
    $('pitch-cinema').dataset.scene=scene.visual;
    $('pitch-prev').disabled=pitchIndex===0;
    const last=pitchIndex===DANCO_PLUS_PITCH_SCENES.length-1;
    $('pitch-next').disabled=last;
    $('pitch-end-actions').hidden=!last;
    $('pitch-play-pause').hidden=last;
    updatePitchCta();
    if(last){pitchPlaying=false; clearPitchAdvance(); if('speechSynthesis' in window)speechSynthesis.cancel();}
    if(speakLine){pitchPlaying=true; $('pitch-play-pause').textContent='Pause'; preloadPitchAudio(pitchIndex); speakPitchScene(scene);}
  }
  function startDancoPitch(){
    localStorage.setItem(DANCO_PLUS_PITCH_PROMPT_KEY,'1'); closeModal('danco-plus-pitch-prompt-modal'); cancelSpeech();
    pitchIndex=0; pitchPlaying=true; pitchMuted=false; $('pitch-sound').textContent='🔊 Sound'; openModal('danco-plus-pitch-modal'); renderDancoPitchScene({speakLine:true});
  }
  function closeDancoPitch(){
    pitchPlaying=false; pitchSpeechToken++; clearPitchAdvance(); if(premiumNarrationAudio){premiumNarrationAudio.pause();premiumNarrationAudio=null;} if('speechSynthesis' in window)speechSynthesis.cancel(); closeModal('danco-plus-pitch-modal');
  }
  function pauseResumeDancoPitch(){
    if(pitchPlaying){pitchPlaying=false; pitchSpeechToken++; clearPitchAdvance(); if(premiumNarrationAudio){premiumNarrationAudio.pause();premiumNarrationAudio=null;} if('speechSynthesis' in window)speechSynthesis.cancel(); $('pitch-play-pause').textContent='Play';return;}
    pitchPlaying=true; $('pitch-play-pause').textContent='Pause'; speakPitchScene(DANCO_PLUS_PITCH_SCENES[pitchIndex]);
  }
  function advanceDancoPitch(delta,fromAuto=false){
    pitchSpeechToken++; clearPitchAdvance(); if(premiumNarrationAudio){premiumNarrationAudio.pause();premiumNarrationAudio=null;} if('speechSynthesis' in window)speechSynthesis.cancel();
    const next=Math.max(0,Math.min(DANCO_PLUS_PITCH_SCENES.length-1,pitchIndex+delta));
    if(next===pitchIndex&&fromAuto){pitchPlaying=false;return;}
    pitchIndex=next; pitchPlaying=true; renderDancoPitchScene({speakLine:true});
  }
  function togglePitchSound(){
    pitchMuted=!pitchMuted; $('pitch-sound').textContent=pitchMuted?'🔇 Muted':'🔊 Sound';
    if(pitchPlaying){pitchSpeechToken++; clearPitchAdvance(); if(premiumNarrationAudio){premiumNarrationAudio.pause();premiumNarrationAudio=null;} if('speechSynthesis' in window)speechSynthesis.cancel(); speakPitchScene(DANCO_PLUS_PITCH_SCENES[pitchIndex]);}
  }
  function openDancoPitch({prompt=false}={}){
    if(prompt){openModal('danco-plus-pitch-prompt-modal');return;}
    startDancoPitch();
  }
  function skipDancoPitchPrompt(){localStorage.setItem(DANCO_PLUS_PITCH_PROMPT_KEY,'1');closeModal('danco-plus-pitch-prompt-modal');}
  function maybeOfferDancoPitch(){
    if(localStorage.getItem(DANCO_PLUS_PITCH_PROMPT_KEY))return;
    if(!(isOwner()||trialRemaining()>0))return;
    setTimeout(()=>{if(!$('danco-plus-pitch-modal').classList.contains('open'))openModal('danco-plus-pitch-prompt-modal');},360);
  }
  function pitchPrimaryAction(){
    closeDancoPitch();
    if(dancoPlusActive()){toast('Danco+ is active. Open Administrator to continue the advanced hiring workflow.');return;}
    openDancoPlusRequest('Danco+ advanced hiring workflow');
  }

  function premiumAudioUrl(id){return id?`https://www.aidocmaker.com/g0/audio?name=${id}`:'';}
  function stopPremiumNarration(){if(premiumNarrationAudio){premiumNarrationAudio.pause();premiumNarrationAudio.src='';premiumNarrationAudio=null;}}
  function playPremiumNarration(url,{fallback=null,remember=null}={}){
    if(!settings.audio)return false;
    if(!url)return false;
    if(settings.voiceMode==='device'){if(fallback)speak(fallback,{preferDevice:true,remember:remember!==false});return true;}
    stopPremiumNarration(); narrationQueueToken++; Object.values(narrationPlayers).forEach(audio=>audio.pause()); if('speechSynthesis' in window)speechSynthesis.cancel();
    if(remember)lastRepeatableSpeech=[...speechSegments(remember)];
    try{
      const audio=new Audio(url);premiumNarrationAudio=audio;audio.preload='auto';
      audio.onerror=()=>{stopPremiumNarration();if(fallback)speak(fallback,{remember:remember!==false});};
      const playback=audio.play();if(playback?.catch)playback.catch(()=>{stopPremiumNarration();if(fallback)speak(fallback,{remember:remember!==false});});
      return true;
    }catch(_){if(fallback)speak(fallback,{remember:remember!==false});return false;}
  }
  function speakPremiumGuide(key,fallback){const url=PREMIUM_GUIDE_AUDIO?.[settings.lang]?.[key];return playPremiumNarration(url,{fallback,remember:fallback});}
  function speakPremiumQuestion(kind,index,fallback){const id=PREMIUM_QUESTION_AUDIO?.[settings.lang]?.[kind]?.[index];return playPremiumNarration(premiumAudioUrl(id),{fallback,remember:fallback});}

  function initialiseNarration(){
    narrationPlayers={
      en:new Audio('./narration-en.mp3?v=36.0.0'),
      es:new Audio('./narration-es.mp3?v=36.0.0')
    };
    Object.values(narrationPlayers).forEach(audio=>{audio.preload='auto';audio.load();});
    narrationAudio=narrationPlayers[settings.lang];
    applyVoiceModeUi();
  }
  function speechSegments(value){
    return (Array.isArray(value)?value:[value]).map(item=>String(item||'').trim()).filter(Boolean);
  }
  function narrationSource(text,language){
    return globalThis.DANCO_NARRATION?.[language]?.[text]||'';
  }
  function shouldUseDeviceForQueue(segments){
    if(settings.voiceMode==='device') return true;
    return segments.some(text=>!narrationSource(text,settings.lang));
  }
  function speakDeviceQueue(segments,token,index=0){
    if(token!==narrationQueueToken||index>=segments.length)return;
    if(!('speechSynthesis' in window)){ if(index+1<segments.length)speakDeviceQueue(segments,token,index+1);else toast(t('narrationUnavailable')); return; }
    try{
      const utterance=new SpeechSynthesisUtterance(segments[index]);
      utterance.lang=settings.lang==='es'?'es-US':'en-US'; utterance.rate=.94;
      utterance.onend=()=>speakDeviceQueue(segments,token,index+1);
      utterance.onerror=()=>speakDeviceQueue(segments,token,index+1);
      speechSynthesis.cancel(); speechSynthesis.speak(utterance);
    }catch(_){ speakDeviceQueue(segments,token,index+1); }
  }
  function playNarrationSegment(token,index){
    if(token!==narrationQueueToken||index>=narrationQueue.length) return;
    const clip=narrationSource(narrationQueue[index],settings.lang);
    const audio=narrationPlayers[settings.lang];
    if(!clip||!audio){ if(settings.voiceMode==='device')speakDeviceQueue(narrationQueue,token,index); else{toast(t('narrationUnavailable'));playNarrationSegment(token,index+1);} return; }
    if(narrationAudio&&narrationAudio!==audio) narrationAudio.pause();
    narrationAudio=audio;
    const finish=()=>{
      if(token!==narrationQueueToken) return;
      audio.pause(); audio.ontimeupdate=null; audio.onended=null;
      playNarrationSegment(token,index+1);
    };
    const begin=()=>{
      if(token!==narrationQueueToken) return;
      audio.onloadedmetadata=null;
      try{audio.currentTime=Math.max(0,Number(clip.start)||0);}catch(_){setTimeout(begin,60);return;}
      audio.ontimeupdate=()=>{if(audio.currentTime>=Math.max(Number(clip.start)||0,Number(clip.end)-.045))finish();};
      audio.onended=finish;
      audio.onerror=()=>{if(settings.voiceMode==='device')speakDeviceQueue(narrationQueue,token,index);else playNarrationSegment(token,index+1);};
      const playback=audio.play();
      if(playback?.catch) playback.catch(()=>toast(t('tapRepeatAudio')));
    };
    if(audio.readyState>=1) begin(); else{audio.onloadedmetadata=begin;audio.load();}
  }
  function speak(value,options={}){
    const segments=speechSegments(value);
    if(!segments.length) return;
    if(options.remember!==false) lastRepeatableSpeech=[...segments];
    if(!settings.audio&&!options.force) return;
    narrationQueueToken++;
    narrationQueue=[...segments];
    Object.values(narrationPlayers).forEach(audio=>audio.pause());
    if('speechSynthesis' in window)speechSynthesis.cancel();
    if(settings.voiceMode==='device'||options.preferDevice===true) speakDeviceQueue(narrationQueue,narrationQueueToken,0);
    else playNarrationSegment(narrationQueueToken,0);
  }
  function cancelSpeech(){
    stopPremiumNarration();
    narrationQueueToken++;
    narrationQueue=[];
    Object.values(narrationPlayers).forEach(audio=>{audio.pause();audio.ontimeupdate=null;audio.onended=null;audio.onloadedmetadata=null;audio.onerror=null;});
    if('speechSynthesis' in window)speechSynthesis.cancel();
  }
  function applyVoiceModeUi(){
    $$('[data-voice-mode]').forEach(button=>button.classList.toggle('active',button.dataset.voiceMode===settings.voiceMode));
    const title=$('selected-voice-title'); if(title)title.textContent=settings.voiceMode==='device'?t('deviceVoiceTitle'):t('standardVoiceTitle');
    const copy=$('selected-voice-copy'); if(copy)copy.textContent=settings.voiceMode==='device'?t('deviceVoiceCopy'):t('standardVoiceCopy');
  }
  function setVoiceMode(mode){
    settings.voiceMode=mode==='device'?'device':'recorded';saveSettings();cancelSpeech();applyVoiceModeUi();toast(settings.voiceMode==='device'?t('deviceVoiceTitle'):t('standardVoiceTitle'));
  }
  function testNarration(){ const was=settings.audio;settings.audio=true;speakPremiumGuide('setup',t('voiceSample'));settings.audio=was; }
  function closeHelp(){ $('help-drawer').classList.remove('open'); $('help-backdrop').classList.remove('open'); $('help-drawer').setAttribute('aria-hidden','true'); }
  function openHelp(){ $('help-drawer').classList.add('open'); $('help-backdrop').classList.add('open'); $('help-drawer').setAttribute('aria-hidden','false'); applyVoiceModeUi(); speakPremiumGuide('help',[t('helpTitle'),t('helpDefault')]); }
  function repeatHelpAudio(){ speak(Array.isArray(lastRepeatableSpeech)&&lastRepeatableSpeech.length?lastRepeatableSpeech:[t('helpTitle'),t('helpDefault')],{remember:false,force:true}); }
  async function toggleAppFullscreen(forceExit=false){
    const active=document.body.classList.contains('immersive-mode');
    if(active||forceExit){
      try{if(document.fullscreenElement&&document.exitFullscreen)await document.exitFullscreen();else if(document.webkitFullscreenElement&&document.webkitExitFullscreen)document.webkitExitFullscreen();}catch(_){}
      nativeFullscreenActive=false;document.body.classList.remove('immersive-mode');toast(t('fullscreenOff'));return;
    }
    let nativeWorked=false;
    try{
      const request=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;
      if(request){await request.call(document.documentElement);nativeWorked=!!(document.fullscreenElement||document.webkitFullscreenElement);}
    }catch(_){}
    nativeFullscreenActive=nativeWorked;document.body.classList.add('immersive-mode');
    const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;
    toast(!nativeWorked&&ios?t('fullscreenIos'):t('fullscreenOn'));
  }

  function ssnValueKey(value){ return String(value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,''); }
  function validateSsn(value){
    const raw=String(value||'').trim(); const key=ssnValueKey(raw);
    if(key==='PROTOTYPE') return {valid:true,prototype:true,status:'prototype',last4:'',message:'Prototype bypass accepted.'};
    const digits=raw.replace(/\D/g,'');
    if(digits.length!==9) return {valid:false,prototype:false,status:raw?'invalid':'not_provided',last4:'',message:raw?'SSN must contain 9 digits.':'No Social Security number provided.'};
    const area=Number(digits.slice(0,3)),group=Number(digits.slice(3,5)),serial=Number(digits.slice(5));
    if(area===0||area===666||area>=900||group===0||serial===0) return {valid:false,prototype:false,status:'invalid',last4:'',message:'This number uses an invalid SSN number range.'};
    if(/^([0-9])\1{8}$/.test(digits)||['123456789','987654321'].includes(digits)) return {valid:false,prototype:false,status:'invalid',last4:'',message:'This number does not appear to be a valid SSN format.'};
    return {valid:true,prototype:false,status:'valid',last4:digits.slice(-4),message:'SSN format appears valid.'};
  }
  function formatSsnInput(value){
    if(String(value||'').trim().toUpperCase().startsWith('P')) return String(value||'').toUpperCase().replace(/[^A-Z]/g,'').slice(0,9);
    const digits=String(value||'').replace(/\D/g,'').slice(0,9);
    return digits.length<=3?digits:digits.length<=5?`${digits.slice(0,3)}-${digits.slice(3)}`:`${digits.slice(0,3)}-${digits.slice(3,5)}-${digits.slice(5)}`;
  }
  function updateSsnStatus(){
    const input=$('candidate-ssn'),status=$('ssn-status'); if(!input||!status)return;
    const check=validateSsn(input.value);
    if(check.valid){ status.textContent=check.prototype?'Prototype bypass accepted — no real SSN is stored.':'SSN format appears valid. Full SSN will not be written into the normal Danco applicant record.'; status.className='field-status valid'; }
    else if(input.value.trim()){ status.textContent=`${check.message} You can correct it or continue without a valid SSN.`; status.className='field-status invalid'; }
    else{ status.textContent='Format check only. Prototype testers may enter PROTOTYPE.'; status.className='field-status'; }
  }
  function resetSsnOverrideIfChanged(){
    const key=ssnValueKey($('candidate-ssn')?.value||'');
    if(ssnOverrideState.approved&&ssnOverrideState.valueKey!==key) ssnOverrideState={approved:false,valueKey:'',reason:'',other:''};
  }
  function applicationFromForm(){
    const ssnCheck=validateSsn($('candidate-ssn')?.value||'');
    return {
      email:$('candidate-email')?.value.trim()||'',
      phone:$('candidate-phone')?.value.trim()||'',
      address:$('candidate-address')?.value.trim()||'',
      city:$('candidate-city')?.value.trim()||'',
      state:$('candidate-state')?.value.trim()||'',
      zip:$('candidate-zip')?.value.trim()||'',
      dateOfBirth:$('candidate-dob')?.value||'',
      ssnStatus:ssnCheck.valid?ssnCheck.status:(ssnOverrideState.approved?'invalid_or_missing_accepted':ssnCheck.status),
      ssnLast4:ssnCheck.valid&&!ssnCheck.prototype?ssnCheck.last4:'',
      ssnPrototypeBypass:!!ssnCheck.prototype,
      ssnMissingReason:ssnOverrideState.approved?ssnOverrideState.reason:'',
      ssnMissingReasonOther:ssnOverrideState.approved?ssnOverrideState.other:'',
      availability:$('candidate-availability')?.value||'',
      role:$('candidate-role')?.value||'',
      experience:$('candidate-experience')?.value||'',
      authorization:$('candidate-authorization')?.value||'',
      license:$('candidate-license')?.value||'',
      otherRoles:document.querySelector('input[name="other-roles"]:checked')?.value||'Yes',
      backgroundConsent:document.querySelector('input[name="background-consent"]:checked')?.value||'',
      backgroundConsentReason:$('background-consent-reason')?.value.trim()||'',
      privacyAcknowledged:!!$('candidate-privacy-ack')?.checked,
      inviteSource:inviteLiveMode(),
      inviteId:inviteLiveMode()?activeInvite?.id||'':'',
      inviteCode:inviteLiveMode()?String(INVITE_TOKEN).slice(0,8).toUpperCase():''
    };
  }
  function populateApplicationForm(application={}){
    const fields={
      'candidate-email':application.email,
      'candidate-phone':application.phone,
      'candidate-address':application.address,
      'candidate-city':application.city,
      'candidate-state':application.state,
      'candidate-zip':application.zip,
      'candidate-dob':application.dateOfBirth,
      'candidate-availability':application.availability,
      'candidate-role':application.role,
      'candidate-experience':application.experience,
      'candidate-authorization':application.authorization,
      'candidate-license':application.license,
      'background-consent-reason':application.backgroundConsentReason
    };
    Object.entries(fields).forEach(([id,value])=>{ if($(id)) $(id).value=value||''; });
    if($('candidate-ssn')) $('candidate-ssn').value=application.ssnPrototypeBypass?'PROTOTYPE':'';
    if(application.ssnStatus==='invalid_or_missing_accepted') ssnOverrideState={approved:true,valueKey:'',reason:application.ssnMissingReason||'',other:application.ssnMissingReasonOther||''};
    else ssnOverrideState={approved:false,valueKey:'',reason:'',other:''};
    const otherRoles=application.otherRoles||'Yes';
    $$('input[name="other-roles"]').forEach(input=>{input.checked=input.value===otherRoles;});
    const backgroundConsent=application.backgroundConsent||'';
    $$('input[name="background-consent"]').forEach(input=>{input.checked=input.value===backgroundConsent;});
    if($('candidate-privacy-ack'))$('candidate-privacy-ack').checked=!!application.privacyAcknowledged;
    updateBackgroundConsentReason(); updateRoleExperienceLabel(); updateSsnStatus();
  }
  function openSsnWarning(){
    $('ssn-warning-copy').textContent=validateSsn($('candidate-ssn')?.value||'').message+' Do you want to proceed with the application without providing a valid Social Security number?';
    $('ssn-warning-choice-actions').hidden=false; $('ssn-reason-panel').hidden=true; $('ssn-warning-error').textContent='';
    $('ssn-missing-reason').value=ssnOverrideState.reason||''; $('ssn-missing-reason-other').value=ssnOverrideState.other||''; updateSsnOtherReason(); openModal('ssn-warning-modal');
  }
  function updateSsnOtherReason(){ if($('ssn-other-reason-wrap')) $('ssn-other-reason-wrap').hidden=$('ssn-missing-reason')?.value!=='Other'; }
  function confirmSsnOverride(){
    const reason=$('ssn-missing-reason').value; const other=$('ssn-missing-reason-other').value.trim(); $('ssn-warning-error').textContent='';
    if(!reason){$('ssn-warning-error').textContent='Choose a reason before continuing.';return;}
    if(reason==='Other'&&!other){$('ssn-warning-error').textContent='Enter the other reason before continuing.';return;}
    ssnOverrideState={approved:true,valueKey:ssnValueKey($('candidate-ssn')?.value||''),reason,other:reason==='Other'?other:''};
    closeModal('ssn-warning-modal'); beginBeginner(true);
  }


  function salesRoleSelected(application=session?.application){
    return String(application?.role||'')==='Commercial Account Manager';
  }
  function activeAssessmentTrack(){
    return session?.assessmentTrack==='account_manager'||salesRoleSelected()?'account_manager':'roofing';
  }
  function activeQuestionBank(){ return activeAssessmentTrack()==='account_manager'?SALES_QUESTIONS:QUESTIONS; }
  function updateBackgroundConsentReason(){
    const no=document.querySelector('input[name="background-consent"]:checked')?.value==='No';
    const wrap=$('background-consent-reason-wrap'); if(wrap)wrap.hidden=!no;
  }
  function updateRoleExperienceLabel(){
    const sales=$('candidate-role')?.value==='Commercial Account Manager';
    const label=$('candidate-experience-label');
    if(label)label.textContent=sales?(settings.lang==='es'?'Experiencia en ventas comerciales / construcción':'Commercial / construction sales experience'):t('experienceLabel');
  }

  function newSession(){
    const invite=inviteLiveMode();
    const initialMode=invite?'application':settings.deviceMode==='choice'?'':settings.deviceMode;
    const inviteRole=invite?activeInvite?.role||'':'';
    const track=inviteRole==='Commercial Account Manager'?'account_manager':'roofing';
    const bank=track==='account_manager'?SALES_QUESTIONS:QUESTIONS;
    session={status:'setup',mode:initialMode,name:invite?(activeInvite?.inviteeName||''):'',reference:'',application:invite?{role:inviteRole,inviteSource:true,inviteId:activeInvite?.id||'',privacyAcknowledged:false}:{},applicationSubmitted:false,assessmentTrack:track,lang:settings.lang,audio:settings.audio,supportReason:settings.audio?normaliseSupportReason(settings.supportReason):0,profileSkipped:false,profileAnswers:[],knowledgeAnswers:Array(10).fill(0),questionOrder:shuffle(bank.map(q=>q.id)),knowledgeIndex:0,startedAt:new Date().toISOString(),trialConsumed:invite,inviteId:invite?activeInvite?.id||'':'',inviteToken:invite?INVITE_TOKEN:''};
    ssnOverrideState={approved:false,valueKey:'',reason:'',other:''}; saveSession();
  }
  function goToSetup(){
    if(!session || session.status==='complete') newSession();
    if(!session.mode){ routeAfterLanguage(); return; }
    session.lang=settings.lang; session.audio=settings.audio;
    if(inviteLiveMode()){session.mode='application';session.application={...(session.application||{}),role:activeInvite.role,inviteSource:true,inviteId:activeInvite.id};session.name=session.name||activeInvite.inviteeName||'';}
    $('candidate-name').value=session.name||''; $('setup-error').textContent='';
    populateApplicationForm(session.application||{}); applyProductMode(); renderAudioSupportControls();
    if(inviteLiveMode()){
      $('candidate-role').value=activeInvite.role;$('candidate-role').disabled=true;
      document.querySelector('.prototype-optional')?.setAttribute('hidden','');
      if($('candidate-privacy-ack-wrap'))$('candidate-privacy-ack-wrap').hidden=false;
      updateRoleExperienceLabel();
    }else{$('candidate-role').disabled=false;document.querySelector('.prototype-optional')?.removeAttribute('hidden');}
    showScreen('setup-screen'); {const appMode=activeProductMode()==='application';const line=t(appMode?'applicationSetupHelper':'setupHelper');speakPremiumGuide(appMode?'application':'setup',line);}
  }
  function beginBeginner(skipSsnPrompt=false){
    const name=$('candidate-name').value.trim(); $('setup-error').textContent='';
    if(!name){ $('setup-error').textContent=t('requiredError'); return; }
    if(settings.audio&&!normaliseSupportReason(settings.supportReason)){ $('setup-error').textContent=t('supportReasonError'); $('support-reason-fieldset').scrollIntoView({behavior:'smooth',block:'center'}); return; }
    if(!canBegin()){ $('setup-error').textContent=trialHash()?t('usedError'):t('lockedError'); openModal('unlock-modal'); return; }
    if(!session || session.status==='complete') newSession();
    const mode=activeProductMode();
    if(mode==='application'&&!inviteLiveMode()){
      resetSsnOverrideIfChanged();
      const check=validateSsn($('candidate-ssn')?.value||'');
      if(!check.valid&&!ssnOverrideState.approved&&!skipSsnPrompt){ openSsnWarning(); return; }
    }
    const application=mode==='application'?applicationFromForm():{};
    if(inviteLiveMode()){application.role=activeInvite.role;application.inviteSource=true;application.inviteId=activeInvite.id;if(!application.privacyAcknowledged){$('setup-error').textContent='Please confirm the personal information acknowledgement before continuing.';$('candidate-privacy-ack')?.focus();return;}}
    if(mode==='application'&&!inviteLiveMode()&&!application.backgroundConsent){ $('setup-error').textContent=settings.lang==='es'?'Indica si autorizas una verificación de antecedentes si tu solicitud avanza.':'Please answer the background-screening consent question.'; return; }
    if(mode==='application'&&!inviteLiveMode()&&application.backgroundConsent==='No'&&!application.backgroundConsentReason){ $('setup-error').textContent=settings.lang==='es'?'Indica brevemente el motivo.':'Please provide a brief reason for declining background screening.'; $('background-consent-reason')?.focus(); return; }
    const assessmentTrack=application.role==='Commercial Account Manager'?'account_manager':'roofing';
    const bank=assessmentTrack==='account_manager'?SALES_QUESTIONS:QUESTIONS;
    Object.assign(session,{mode,name,reference:'',application,assessmentTrack,questionOrder:shuffle(bank.map(q=>q.id)),knowledgeAnswers:Array(10).fill(0),knowledgeIndex:0,lang:settings.lang,audio:settings.audio,supportReason:settings.audio?normaliseSupportReason(settings.supportReason):0,status:'profile-intro'}); saveSession();
    showScreen('profile-intro-screen'); speakPremiumGuide('profile',[t('profileIntroTitle'),t('profileIntroOne'),t('profileIntroTwo')]);
  }


  function startProfile(){ profileIndex=session.profileAnswers?.length||0; session.status='profile'; session.profileSkipped=false; saveSession(); renderProfile(); }
  function skipProfile(){ session.profileSkipped=true; session.profileAnswers=[]; session.status='instructions'; saveSession(); showInstructions(); }
  function renderProfile(){
    if(profileIndex>=PROFILE_QUESTIONS.length){ session.status='instructions'; saveSession(); showInstructions(); return; }
    showScreen('profile-screen'); const q=PROFILE_QUESTIONS[profileIndex];
    $('profile-counter').textContent=t('profileCounter',profileIndex+1); $('profile-progress').style.width=`${(profileIndex/5)*100}%`; $('profile-question').textContent=q[settings.lang];
    profileSelectedIndex=null; $('profile-confirm').disabled=true; $('profile-confirm').blur();
    document.querySelector('#profile-screen .question-hint').textContent=t('profileHint');
    $('profile-options').innerHTML=q.options.map((o,i)=>`<button class="profile-option" type="button" data-profile-option="${i}" aria-pressed="false"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(o[settings.lang])}</span></button>`).join('');
    $$('[data-profile-option]').forEach(button=>button.addEventListener('click',()=>{
      profileSelectedIndex=Number(button.dataset.profileOption);
      $$('[data-profile-option]').forEach(optionButton=>{const selected=optionButton===button;optionButton.classList.toggle('selected',selected);optionButton.setAttribute('aria-pressed',String(selected));});
      $('profile-confirm').disabled=false; document.querySelector('#profile-screen .question-hint').textContent=t('answerSelectedHint');
    }));
    speakPremiumQuestion('profile',profileIndex,[q[settings.lang],...q.options.map(o=>o[settings.lang])]);
  }
  function confirmProfileAnswer(){
    if(profileSelectedIndex===null) return;
    const q=PROFILE_QUESTIONS[profileIndex],option=q?.options[profileSelectedIndex]; if(!option) return;
    $('profile-confirm').disabled=true; $$('[data-profile-option]').forEach(button=>button.disabled=true);
    session.profileAnswers[profileIndex]=option.disc; profileIndex++; saveSession(); setTimeout(renderProfile,350);
  }
  function showInstructions(){
    if($('accessibility-notice')) $('accessibility-notice').hidden=!accessibilitySupportActive();
    const sales=activeAssessmentTrack()==='account_manager';
    $('instructions-title').textContent=sales?(settings.lang==='es'?'Diez preguntas de idoneidad comercial':'Ten commercial suitability questions'):t('instructionsTitle');
    const lead=document.querySelector('#instructions-screen .lead.small');
    if(lead)lead.textContent=sales?(settings.lang==='es'?'Esta evaluación explora experiencia comercial, cartera transferible, desarrollo de negocio, criterio, disciplina de ventas y estilo de venta.':'This assessment explores commercial experience, transferable relationships, new-business development, judgment, sales discipline and selling style.'):t('instructionsLead');
    const featureCopy=document.querySelector('[data-i18n="featureQuestionsCopy"]');
    if(featureCopy)featureCopy.textContent=sales?(settings.lang==='es'?'Todas son preguntas de opción múltiple basadas en escenarios':'All are multiple-choice commercial scenarios'):t('featureQuestionsCopy');
    showScreen('instructions-screen'); speakPremiumGuide(sales?'salesInstructions':'roofingInstructions',[$('instructions-title').textContent,lead?.textContent||'',t('timingNotice')]);
  }

  function shuffle(array){ const out=[...array]; for(let i=out.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [out[i],out[j]]=[out[j],out[i]]; } return out; }
  function seededOptions(q){
    const order=PREMIUM_OPTION_ORDERS[(Number(q.id||1)-1)%PREMIUM_OPTION_ORDERS.length]||[0,1,2,3];
    return order.map(index=>({option:q.options[index],index})).filter(item=>item.option);
  }
  function currentQuestion(){ const id=session.questionOrder[session.knowledgeIndex]; return activeQuestionBank().find(q=>q.id===id); }
  function standardQuestionSeconds(){return 45;}
  function accessibleAnswerSeconds(){return 60;}
  async function startKnowledge(){
    if(!canBegin() && !session?.trialConsumed){ openModal('unlock-modal'); return; }
    if(inviteLiveMode()){
      try{const response=await inviteRequest({action:'start',token:INVITE_TOKEN});activeInvite=response.invite||activeInvite;if(['completed','submitted'].includes(activeInvite?.status)&&activeInvite?.resultCode){session.resultCode=activeInvite.resultCode;session.status='complete';session.applicationSubmitted=activeInvite.status==='submitted';session.submissionReference=activeInvite.submissionReference||'';saveSession();renderResult();return;}}
      catch(error){toast(error.message||'Unable to start this candidate assessment.');return;}
    }
    session.status='knowledge'; session.knowledgeIndex=Number(session.knowledgeIndex||0); session.knowledgeAnswers=session.knowledgeAnswers||Array(10).fill(0); saveSession(); renderKnowledgeQuestion();
  }
  function renderKnowledgeQuestion(){
    clearInterval(timer); optionLocked=false; knowledgeSelectedIndex=null;pendingAccessibleCommit=false;
    if(session.knowledgeIndex>=activeQuestionBank().length){ completeAssessment(); return; }
    showScreen('knowledge-screen'); const q=currentQuestion(); currentDisplayOptions=seededOptions(q);
    $('knowledge-counter').textContent=t('knowledgeCounter',session.knowledgeIndex+1); $('knowledge-tier').textContent=q.tierLabel?q.tierLabel[settings.lang]:t('tiers')[q.tier]; $('knowledge-progress').style.width=`${(session.knowledgeIndex/10)*100}%`;
    $('knowledge-category').textContent=q.catLabel?q.catLabel[settings.lang]:t('categories')[q.cat]; $('knowledge-question').textContent=q[settings.lang];
    $('knowledge-options').innerHTML=currentDisplayOptions.map(({option,index},displayIndex)=>{
      const visual=!!option.img; const copy=q.hideText?'':`<span class="answer-copy"><span class="option-letter">${String.fromCharCode(65+displayIndex)}</span><span>${escapeHtml(option[settings.lang])}</span></span>`;
      const accessibleLabel=q.hideText?`${settings.lang==='es'?'Opción':'Option'} ${String.fromCharCode(65+displayIndex)}`:option[settings.lang];
      return `<button class="knowledge-option ${visual?'visual':'text-only'}" type="button" data-answer-index="${index}" aria-label="${escapeHtml(accessibleLabel)}" aria-pressed="false">${visual?`<img src="${option.img}" alt="" draggable="false">`:''}${copy||`<span class="answer-copy"><span class="option-letter">${String.fromCharCode(65+displayIndex)}</span></span>`}</button>`;
    }).join('');
    $$('[data-answer-index]').forEach(button=>button.addEventListener('click',()=>selectKnowledgeAnswer(button)));
    $('knowledge-confirm').disabled=true;
    const sameTimedQuestion=Number(session.activeKnowledgeIndex)===Number(session.knowledgeIndex);
    const savedPhase=sameTimedQuestion?session.questionPhase:'';
    const hasSavedDeadline=!!(sameTimedQuestion&&session.answerDeadline);
    const savedRemaining=hasSavedDeadline?Math.ceil((Number(session.answerDeadline)-Date.now())/1000):0;
    const savedSelection=sameTimedQuestion&&session.pendingKnowledgeSelection!==null&&session.pendingKnowledgeSelection!==undefined&&Number.isInteger(Number(session.pendingKnowledgeSelection))?Number(session.pendingKnowledgeSelection):null;
    if(savedSelection!==null&&savedSelection>=0&&savedSelection<4)knowledgeSelectedIndex=savedSelection;
    session.activeKnowledgeIndex=session.knowledgeIndex;saveSession();
    if(accessibilitySupportActive()){
      if(savedPhase==='answer'){
        $('knowledge-options').hidden=false;$('knowledge-repeat').hidden=false;$('knowledge-reveal').hidden=true;
        if(hasSavedDeadline&&savedRemaining<=0){phase='answer';$('phase-label').textContent=t('answer');$('timer-display').textContent='00';setTimeout(timeOutQuestion,0);}else startPhase('answer',Math.max(1,savedRemaining||accessibleAnswerSeconds()),{preserveDeadline:hasSavedDeadline&&savedRemaining>0});
      }else{
        phase='review';clearInterval(timer);session.questionPhase='review';session.answerDeadline=0;saveSession();$('phase-label').textContent=settings.lang==='es'?'PREGUNTA':'QUESTION';$('timer-display').textContent='--';$('timer-display').parentElement.classList.remove('answer');
        $('knowledge-hint').textContent=settings.lang==='es'?'Escucha o repite la pregunta. Cuando estés listo, revela las respuestas para iniciar los 60 segundos.':'Listen to or repeat the question. When you are ready, reveal the answers to start the 60-second answer timer.';
        $('knowledge-options').hidden=true;$('knowledge-repeat').hidden=false;$('knowledge-reveal').hidden=false;
      }
      speak(q[settings.lang]);
    }else{
      $('knowledge-options').hidden=false;$('knowledge-repeat').hidden=true;$('knowledge-reveal').hidden=true;
      if(hasSavedDeadline&&savedRemaining<=0){phase='answer';$('phase-label').textContent=t('answer');$('timer-display').textContent='00';setTimeout(timeOutQuestion,0);}else startPhase('answer',Math.max(1,savedRemaining||standardQuestionSeconds()),{preserveDeadline:hasSavedDeadline&&savedRemaining>0});
      if(settings.audio)speak(q[settings.lang]);
    }
    if(knowledgeSelectedIndex!==null){
      const selectedButton=document.querySelector(`[data-answer-index="${knowledgeSelectedIndex}"]`);if(selectedButton){selectedButton.classList.add('selected');selectedButton.setAttribute('aria-pressed','true');$('knowledge-confirm').disabled=false;}
    }
  }
  function revealAccessibleAnswers(){
    if(!accessibilitySupportActive()||phase!=='review'||optionLocked)return;
    $('knowledge-options').hidden=false;$('knowledge-reveal').hidden=true;
    startPhase('answer',accessibleAnswerSeconds());
    speak(settings.lang==='es'?'Respuestas reveladas. Tienes sesenta segundos. Selecciona una respuesta para escucharla.':'Answers revealed. You have sixty seconds. Select an answer to hear it.',{force:true});
  }
  function startPhase(nextPhase, seconds,{preserveDeadline=false}={}){
    clearInterval(timer); phase=nextPhase; phaseRemaining=seconds;
    if(session){session.questionPhase=nextPhase;if(nextPhase==='answer'&&!preserveDeadline)session.answerDeadline=Date.now()+seconds*1000;saveSession();}
    updateTimer();
    if(phase==='answer'){
      $('phase-label').textContent=t('answer'); $('timer-display').parentElement.classList.add('answer');
      $('knowledge-hint').textContent=accessibilitySupportActive()?(settings.lang==='es'?'Selecciona una respuesta. Se leerá en voz alta cuando la pulses.':'Select an answer. It will be read aloud when you press it.'):t('answerHint');
      $$('[data-answer-index]').forEach(button=>button.disabled=false);
      $('knowledge-confirm').disabled=knowledgeSelectedIndex===null;
    }
    timer=setInterval(()=>{ phaseRemaining--; updateTimer(); if(phaseRemaining<=0){ clearInterval(timer); timeOutQuestion(); } },1000);
  }
  function updateTimer(){ $('timer-display').textContent=phase==='review'&&accessibilitySupportActive()?'--':String(Math.max(0,phaseRemaining)).padStart(2,'0'); }
  function repeatCurrentQuestion(){
    const q=currentQuestion(); if(!q) return;
    if(accessibilitySupportActive())speak(q[settings.lang],{force:true});
    else speak(q[settings.lang],{force:true});
  }
  function selectKnowledgeAnswer(button){
    if(optionLocked || phase!=='answer') return;
    knowledgeSelectedIndex=Number(button.dataset.answerIndex);session.pendingKnowledgeSelection=knowledgeSelectedIndex;saveSession();
    $$('[data-answer-index]').forEach(optionButton=>{const selected=optionButton===button;optionButton.classList.toggle('selected',selected);optionButton.setAttribute('aria-pressed',String(selected));});
    $('knowledge-confirm').disabled=false; $('knowledge-hint').textContent=t('answerSelectedHint');
    if(accessibilitySupportActive()){
      const selected=currentDisplayOptions.find(item=>item.index===knowledgeSelectedIndex)?.option;
      if(selected)speak(selected[settings.lang]||'',{force:true});
    }
  }
  function commitKnowledgeAnswer(){
    if(optionLocked||phase!=='answer'||knowledgeSelectedIndex===null) return;
    optionLocked=true; clearInterval(timer); $('knowledge-confirm').disabled=true; $$('[data-answer-index]').forEach(button=>button.disabled=true);
    const q=currentQuestion(); session.knowledgeAnswers[q.id-1]=knowledgeSelectedIndex+1;session.questionPhase='';session.answerDeadline=0;session.pendingKnowledgeSelection=null; saveSession(); setTimeout(advanceKnowledge,650);
  }
  function confirmKnowledgeAnswer(){
    if(optionLocked||phase!=='answer'||knowledgeSelectedIndex===null) return;
    if(accessibilitySupportActive()){
      pendingAccessibleCommit=true;openModal('accessible-answer-confirm-modal');
      speak(settings.lang==='es'?'¿Estás seguro de que quieres confirmar esta respuesta? Elige no para volver o sí para confirmar.':'Are you sure you want to commit this answer? Choose no to go back, or yes to commit.',{force:true});
      return;
    }
    commitKnowledgeAnswer();
  }
  function accessibleCommitDecision(yes){
    if(!pendingAccessibleCommit)return;pendingAccessibleCommit=false;closeModal('accessible-answer-confirm-modal');
    speak(yes?(settings.lang==='es'?'Sí. Respuesta confirmada.':'Yes. Answer committed.'):(settings.lang==='es'?'No. Vuelve a elegir.':'No. Go back to your answer.'),{force:true});
    if(yes)commitKnowledgeAnswer();
  }
  function timeOutQuestion(){
    if(optionLocked) return; optionLocked=true; $('knowledge-confirm').disabled=true; $$('[data-answer-index]').forEach(button=>button.disabled=true);
    const q=currentQuestion(); session.knowledgeAnswers[q.id-1]=knowledgeSelectedIndex===null?0:knowledgeSelectedIndex+1;session.questionPhase='';session.answerDeadline=0;session.pendingKnowledgeSelection=null; saveSession();
    toast(knowledgeSelectedIndex===null?t('timedOut'):(settings.lang==='es'?'Tiempo agotado — se registró la respuesta seleccionada.':'Time expired — your selected answer was recorded.')); setTimeout(advanceKnowledge,850);
  }
  function advanceKnowledge(){ session.knowledgeIndex++;session.questionPhase='';session.answerDeadline=0;session.pendingKnowledgeSelection=null;session.activeKnowledgeIndex=session.knowledgeIndex; saveSession(); renderKnowledgeQuestion(); }

  async function completeAssessment(){
    clearInterval(timer); if(session.status!=='complete'){
      session.status='complete'; session.completedAt=new Date().toISOString(); session.lang=settings.lang; session.audio=settings.audio; session.supportReason=settings.audio?normaliseSupportReason(settings.supportReason):0;session.questionPhase='';session.answerDeadline=0; consumeTrialCompletion(); session.resultCode=encodeResult(session); saveSession(); applyAccessState();
    }
    if(inviteLiveMode()&&session.resultCode){
      try{const draftRecord={name:session.name||'',application:{...(session.application||{})},assessment:{knowledgeAnswers:[...(session.knowledgeAnswers||[])],profileSkipped:!!session.profileSkipped,profileAnswers:[...(session.profileAnswers||[])],assessmentTrack:activeAssessmentTrack(),lang:session.lang,audio:!!session.audio,supportReason:normaliseSupportReason(session.supportReason)},resultCode:session.resultCode};const r=await inviteRequest({action:'complete',token:INVITE_TOKEN,resultCode:session.resultCode,draftRecord});if(r?.invite)activeInvite=r.invite;}
      catch(error){toast('Result saved on this device. Danco link status will retry when you submit.');}
    }
    renderResult();
  }
  function renderResult(){
    if(!session?.resultCode) return;
    const applicationMode=session.mode==='application';
    const submitted=!!session.applicationSubmitted;
    const resultCard=$('result-title').closest('.result-card');
    resultCard.querySelector('[data-i18n="completeEyebrow"]').textContent=t(applicationMode?'applicationCompleteEyebrow':'completeEyebrow');
    $('result-title').textContent=t(applicationMode?(submitted?'applicationSubmittedTitle':'applicationCompleteTitle'):'completeTitle');
    resultCard.querySelector('[data-i18n="completeLead"]').textContent=t(applicationMode?(submitted?'applicationSubmittedLead':'applicationCompleteLead'):'completeLead');
    $('result-code-label').textContent=t(applicationMode?'applicationNumberLabel':'resultCodeLabel');
    $('copy-code').textContent=t(applicationMode?'copyApplicationNumber':'copyCode');
    resultCard.querySelector('[data-i18n="resultInstruction"]').textContent=t(applicationMode?(submitted?'applicationSubmittedInstruction':'applicationResultInstruction'):'resultInstruction');
    $('result-code').textContent=applicationMode?(session.submissionReference?(isInviteRecord({application:session.application})?`LINK-${session.submissionReference}`:session.submissionReference):t('applicationReferencePending')):session.resultCode;
    $('copy-code').hidden=applicationMode&&!session.submissionReference;
    $('completion-meta').innerHTML=`<b>${escapeHtml(session.name)}</b><br>${escapeHtml(session.profileSkipped?t('profileSkipped'):t('profileDone'))}${session.submissionReference?`<br>${escapeHtml(isInviteRecord({application:session.application})?`LINK-${session.submissionReference}`:session.submissionReference)}`:''}`;
    const applicationSummary=$('application-result-summary');
    applicationSummary.hidden=!applicationMode;
    applicationSummary.innerHTML=applicationMode?`<div><span>${escapeHtml(t('appliedPositionLabel'))}</span><b>${escapeHtml(session.application?.role||t('notSpecified'))}</b></div><div><span>${escapeHtml(t('otherPositionsLabel'))}</span><b>${escapeHtml(session.application?.otherRoles==='Yes'?t('yesLabel'):session.application?.otherRoles==='No'?t('noLabel'):t('notSpecified'))}</b></div>`:'';
    $('submit-application').textContent=t(applicationMode?'submitApplication':'submitAssessment');
    $('submit-application').hidden=submitted;
    $('application-submit-note').hidden=submitted;
    $('next-applicant').style.display=inviteLiveMode()?'none':(isOwner()||trialRemaining()>0)?'inline-flex':'none';
    showScreen('result-screen'); speakPremiumGuide('complete',[t(applicationMode?(submitted?'applicationSubmittedTitle':'applicationCompleteTitle'):'completeTitle'),t(applicationMode?(submitted?'applicationSubmittedInstruction':'applicationResultInstruction'):'resultInstruction')]);
  }

  function findStoredApplication(code){
    const normalized=normalizeCode(code);
    return storedApplications().find(item=>normalizeCode(item.code)===normalized)||null;
  }

  function demoBackgroundDisplayResults(bg){
    if(!bg) return {};
    if(bg.mode!=='prototype_demo') return bg.results||{};
    const failed=bg.decision==='not_eligible';
    return {
      identity_trace:{label:'Identity / SSN trace',result:'Clear'},
      national_criminal:{label:'National criminal search',result:failed?'Review required':'Clear'},
      county_criminal:{label:'County criminal search',result:failed?'Review required':'Clear'},
      sex_offender_registry:{label:'Sex offender registry',result:'No record'},
      global_watchlist:{label:'Global watchlist',result:'No match'}
    };
  }
  function backgroundStatusLabel(bg){
    if(!bg) return 'AWAITING ADMIN ACTION';
    if(bg.mode==='prototype_demo'){
      if(bg.decision==='eligible') return 'CLEAR';
      if(bg.decision==='not_eligible') return 'REVIEW REQUIRED';
    }
    return String(bg.status||'TO ACTION').replaceAll('_',' ').toUpperCase();
  }
  function backgroundReportFilename(record){
    const bg=record?.backgroundScreening||{};
    const ref=displayRecordReference(record)||record?.reference||record?.code||'DEMO';
    return bg.providerReportFilename||`Danco_Background_Check_Demo_${ref}_${bg.providerRequestId||'REPORT'}.html`;
  }
  function decodeDataHtml(dataUrl){
    try{
      if(!String(dataUrl||'').startsWith('data:text/html;base64,')) return '';
      const raw=atob(String(dataUrl).slice('data:text/html;base64,'.length).replace(/\s+/g,''));
      const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }catch(_){return '';}
  }
  function buildPrototypeBackgroundReportHtml(record){
    const bg=record?.backgroundScreening||{};
    const failed=bg.decision==='not_eligible';
    const res=demoBackgroundDisplayResults(bg);
    const rows=Object.values(res).map(item=>`<tr><td>${escapeHtml(item.label||'Screening area')}</td><td><b>${escapeHtml(item.result||'Status unavailable')}</b></td></tr>`).join('');
    return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(backgroundReportFilename(record))}</title><style>
      body{font-family:Arial,sans-serif;background:#eef4fb;color:#10213f;margin:0}.page{max-width:850px;margin:28px auto;background:white;box-shadow:0 12px 40px #17355722}.head{background:#092b55;color:white;padding:30px 34px;border-bottom:4px solid #cda434}.head small{letter-spacing:.16em;color:#f1d989}.body{padding:28px 34px}.demo{border:2px solid #cda434;background:#fff7da;padding:14px 18px;font-weight:700}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0}.grid div{border:1px solid #d6e2f1;padding:12px}.grid span{display:block;font-size:11px;color:#64758e;text-transform:uppercase;letter-spacing:.06em}table{width:100%;border-collapse:collapse;margin:18px 0}th,td{padding:12px;border-bottom:1px solid #dbe4ef;text-align:left}.good{color:#246a49}.bad{color:#a43131}.fine{font-size:12px;color:#66758a}@media print{body{background:white}.page{margin:0;box-shadow:none}}</style></head><body><div class="page"><div class="head"><small>DANCO ROOFING SERVICES, INC. · DANCO+ PROTOTYPE</small><h1>Background Screening Report</h1></div><div class="body"><div class="demo">DEMONSTRATION ONLY — NOT A CONSUMER REPORT</div><div class="grid"><div><span>Candidate</span><b>${escapeHtml(record?.name||'Prototype applicant')}</b></div><div><span>Application reference</span><b>${escapeHtml(record?.reference||'DEMO')}</b></div><div><span>Screening reference</span><b>${escapeHtml(bg.providerRequestId||'DEMO')}</b></div><div><span>Provider</span><b>${escapeHtml(bg.provider||'Screening provider')}</b></div><div><span>Package</span><b>${escapeHtml(bg.packageLabel||'Employment background screen')}</b></div><div><span>Approved cost</span><b>${bg.quotedCost?`$${Number(bg.quotedCost).toFixed(2)} ${escapeHtml(bg.currency||'USD')}`:'Prototype price not recorded'}</b></div></div><h2 class="${failed?'bad':'good'}">${failed?'Review required · Does not meet Danco demo criteria':'Clear · Meets Danco demo criteria'}</h2><table><thead><tr><th>Screening area</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table><h3>Illustrative full-report detail</h3><p>${failed?'A synthetic review flag was selected by the administrator to demonstrate the non-eligible workflow. No real criminal record, court data or consumer report was obtained.':'All selected categories were configured to return clear or no-record statuses for workflow demonstration. No real criminal record, court data or consumer report was obtained.'}</p><p class="fine">This prototype file demonstrates the full-report filing position. Sensitive source details are intentionally excluded from the ordinary applicant summary and, in live service, would remain restricted to authorized personnel.</p></div></div></body></html>`;
  }
  function renderBackgroundReportViewer(record){
    const bg=record?.backgroundScreening||{},failed=bg.decision==='not_eligible',passed=bg.decision==='eligible',res=demoBackgroundDisplayResults(bg),ref=displayRecordReference(record)||record?.reference||'DEMO';
    const rows=Object.values(res).map(item=>`<tr><td>${escapeHtml(item.label||'Screening area')}</td><td><b class="${/clear|no record|no match/i.test(item.result||'')?'result-good':/review/i.test(item.result||'')?'result-bad':''}">${escapeHtml(item.result||'Status unavailable')}</b></td></tr>`).join('');
    $('background-report-viewer-title')?.remove?.();
    $('background-report-viewer-content').innerHTML=`<article class="background-report-document"><div class="report-document-header"><div class="print-brand"><img src="danco-logo-white.png" alt="Danco Roofing Services, Inc."><span><b>Danco Background Screening Report</b><small>Private administrator view</small></span></div><span class="dashboard-status">${failed?'REVIEW REQUIRED':passed?'CLEAR':'TO ACTION'}</span></div><div class="report-document-body"><div class="dashboard-heading"><div><span class="eyebrow">BACKGROUND SCREENING</span><h2 id="background-report-viewer-title">${escapeHtml(record?.name||'Applicant')}</h2><p>${escapeHtml(ref)}</p></div></div>${bg.mode==='prototype_demo'?'<div class="dashboard-banner">Demonstration report only — this is not a consumer report and no third-party screening was performed.</div>':''}<div class="dashboard-summary"><div class="score-ring background-status-ring" style="--score:${failed?'35':'100'}%"><div><b>${failed?'!':'✓'}</b><span>${failed?'REVIEW':'CLEAR'}</span></div></div><div class="recommendation-card ${failed?'background-report-failed-card':''}"><small>DANCO+ SCREENING STATUS</small><h3>${failed?'Does not meet Danco demonstration criteria':passed?'Meets Danco demonstration criteria':'Screening requires administrator action'}</h3><p>${failed?'A synthetic review flag was selected to demonstrate the non-eligible workflow.':'The selected demonstration categories are recorded as clear/no-record for workflow demonstration.'}</p></div></div><div class="metric-grid"><div class="metric-card"><b>${escapeHtml(bg.provider||'Provider')}</b><span>Provider reference</span></div><div class="metric-card"><b>${escapeHtml(bg.packageLabel||'Employment screen')}</b><span>Screening package</span></div><div class="metric-card"><b>${bg.quotedCost?`$${Number(bg.quotedCost).toFixed(2)}`:'—'}</b><span>Approved cost</span></div></div><h3>Screening category summary</h3><table class="breakdown-table"><thead><tr><th>Screening area</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table><div class="candidate-brief-card"><span class="eyebrow">REPORT DETAIL</span><h3>Demonstration workflow record</h3><p>${failed?'This demonstration intentionally contains a synthetic review result so the blocked candidate path can be presented. No criminal, court, identity or consumer-report data was obtained.':'This demonstration intentionally returns clear/no-record statuses so the successful workflow can be presented. No criminal, court, identity or consumer-report data was obtained.'}</p><p class="fine">In a live integration, authoritative screening detail would remain controlled by the approved screening provider and available only to authorized personnel.</p></div></div></article>`;
    currentBackgroundReportRecord=record;openModal('background-report-viewer-modal');
  }
  function printBackgroundReport(){document.body.classList.add('print-background-report-mode');const clean=()=>document.body.classList.remove('print-background-report-mode');window.addEventListener('afterprint',clean,{once:true});window.print();setTimeout(clean,1600);}

  async function populateBackgroundReportFolder(preloaded=null){
    const select=$('background-report-select'), status=$('background-report-store-status');
    if(!select||!status) return;
    if(!dancoPlusActive()){
      select.innerHTML='<option value="">Danco+ trial required</option>'; select.disabled=true;
      status.textContent='Background-screening reports are part of Danco+.'; return;
    }
    if(!adminAccessPin){
      select.innerHTML='<option value="">Administrator access required</option>'; select.disabled=true; return;
    }
    select.disabled=true; select.innerHTML='<option value="">Loading background-check reports…</option>';
    try{
      const statuses=['background_eligible','background_not_eligible','background_to_action'];
      const all=preloaded
        ? statuses.flatMap(status=>(preloaded[status]||[]).map(item=>({...item,queueStatus:status})))
        : (await Promise.all(statuses.map(status=>sharedRequest('/api/admin',{action:'list',status,adminPin:adminAccessPin})))).flatMap((r,i)=>(r.submissions||[]).map(item=>({...item,queueStatus:statuses[i]})));
      const seen=new Set();
      backgroundReportRecords=all.filter(item=>item.reference&&!seen.has(item.reference)&&seen.add(item.reference));
      select.innerHTML=backgroundReportRecords.length?'<option value="">Select a stored screening report</option>':'<option value="">No background-check reports filed yet</option>';
      backgroundReportRecords.forEach(item=>{
        const opt=document.createElement('option');
        opt.value=item.reference;
        const statusLabel=item.queueStatus==='background_eligible'?'Eligible':item.queueStatus==='background_not_eligible'?'Not eligible':'To action';
        opt.textContent=`${item.name||'Applicant'} — ${displayRecordReference(item)||item.reference} · ${statusLabel}`;
        select.appendChild(opt);
      });
      status.textContent=backgroundReportRecords.length?`${backgroundReportRecords.length} stored screening report${backgroundReportRecords.length===1?'':'s'} · linked to application reference`:'A completed Danco+ screening demonstration will be filed here automatically.';
      select.disabled=false;
    }catch(error){
      select.innerHTML='<option value="">Unable to load report folder</option>'; select.disabled=true;
      status.textContent=error.message||'Unable to load background-check reports.';
    }
  }
  async function openBackgroundReportFile(){
    if(!requireDancoPlus('Background Check Reports')) return;
    const select=$('background-report-select'),ref=select?.value||'';if(!ref){toast('Select a background-check report first.');return;}
    try{const response=await sharedRequest('/api/admin',{action:'get',reference:ref,adminPin:adminAccessPin});const record=response.submission;if(!record?.backgroundScreening)throw new Error('No background-screening record is available for this applicant.');renderBackgroundReportViewer(record);}
    catch(error){toast(error.message||'Unable to open the background-check report.');}
  }


  function queueStatusLabel(status){
    return ({pending:'Yet to process',actioned:'Actioned',archived:'Archived',background_to_action:'CB checked · To action',background_eligible:'CB checked · Eligible',background_not_eligible:'CB checked · Not eligible',employment_contracts:'Employment contracts',signed_employment_contracts:'Signed employment contracts'})[status]||status||'Stored';
  }
  function salesLeaderboardCategoryName(key){
    return ({overall:'Overall',experience:'Experience',network:'Network',development:'Development',consultative:'Consultative',commercial:'Commercial'})[key]||key;
  }
  function salesLeaderboardSortValue(row,key){
    if(key==='name')return String(row.name||'').toLowerCase();
    if(key==='role')return String(row.roleLabel||'').toLowerCase();
    if(key==='queueStatus')return String(queueStatusLabel(row.queueStatus)||'').toLowerCase();
    if(key==='submittedAt')return row.submittedAt?new Date(row.submittedAt).getTime():0;
    if(key==='overall')return Number(row.overall||0);
    return Number(row.categories?.[key]||0);
  }
  function salesLeaderboardComparator(){
    const {key,dir}=salesLeaderboardSort;
    return (a,b)=>{
      const av=salesLeaderboardSortValue(a,key), bv=salesLeaderboardSortValue(b,key);
      let order=0;
      if(typeof av==='string'||typeof bv==='string') order=String(av).localeCompare(String(bv));
      else order=Number(av)-Number(bv);
      if(order===0) order=Number(a.overall||0)-Number(b.overall||0);
      if(order===0) order=String(a.name||'').localeCompare(String(b.name||''));
      return dir==='asc'?order:-order;
    };
  }
  function setSalesLeaderboardSort(key){
    if(salesLeaderboardSort.key===key) salesLeaderboardSort.dir=salesLeaderboardSort.dir==='desc'?'asc':'desc';
    else salesLeaderboardSort={key,dir:'desc'};
    renderSalesLeaderboard();
  }
  function leaderboardEligibleRecord(record){
    const data=record?.assessment?.knowledgeAnswers?record.assessment:decodeResult(record?.resultCode||record?.code||'');
    const role=record?.role||record?.application?.role||'';
    const track=record?.assessmentTrack||data?.assessmentTrack||'';
    if(!(track==='account_manager'||role==='Commercial Account Manager')) return null;
    if(!Array.isArray(data?.knowledgeAnswers)||!data.knowledgeAnswers.length) return null;
    const result=scoreSalesAssessment(data.knowledgeAnswers);
    const rawRef=record.reference||record.code||'';
    const displayRef=record?.application?.inviteSource&&rawRef?`LINK-${rawRef}`:rawRef;
    return {
      source:record.reference?`remote:${record.reference}`:`local:${record.code||''}`,
      queueStatus:record.queueStatus||'pending',name:record.name||'Unnamed applicant',roleLabel:role||'Commercial Account Manager',
      reference:rawRef,displayReference:displayRef,submittedAt:record.submittedAt||'',overall:result.suitability,categories:{...result.categoryPct},result,
      recordType:record.recordType||'assessment',leaderboardHidden:record.leaderboardHidden===true,application:record.application||{}
    };
  }
  function buildSalesLeaderboardRows(records){
    const rows=[];(Array.isArray(records)?records:[]).forEach(record=>{try{const row=leaderboardEligibleRecord(record);if(row)rows.push(row);}catch(_){}});
    const deduped=[],seen=new Set();rows.forEach(row=>{const key=row.reference||`${row.name}|${row.submittedAt}`;if(seen.has(key))return;seen.add(key);deduped.push(row);});return deduped;
  }
  async function refreshSalesLeaderboard(){
    if(!adminAccessPin){salesLeaderboardRows=[];renderSalesLeaderboard();return;}
    try{const response=await sharedRequest('/api/leaderboard',{action:'list',adminPin:adminAccessPin});salesLeaderboardRows=buildSalesLeaderboardRows(response.submissions||[]);renderSalesLeaderboard();updateReportLeaderboardControl(currentLoadedRecord);}
    catch(error){console.warn('Leaderboard unavailable',error);salesLeaderboardRows=buildSalesLeaderboardRows(Object.values(sharedQueueGroups||{}).flat());renderSalesLeaderboard();}
  }
  async function setLeaderboardVisibility(reference,hidden){
    if(!reference)return;
    try{await sharedRequest('/api/leaderboard',{action:hidden?'hide':'restore',reference,adminPin:adminAccessPin});await refreshSalesLeaderboard();toast(hidden?'Removed from league table. Filing location unchanged.':'Restored to sales league table.');}
    catch(error){$('decode-error').textContent=error.message||'Unable to update league table visibility.';}
  }
  async function openLeaderboardRecord(source){
    try{if(source?.startsWith('remote:')||source?.startsWith('local:'))await loadStoredApplicantFromSource(source);}
    catch(error){$('decode-error').textContent=error.message||'Unable to open leaderboard result.';}
  }
  function leaderboardWinnerCopy(row){
    const focus=salesLeaderboardCategoryName(salesLeaderboardSort.key);if(!row)return 'Sales submissions will appear here after applicants complete the Commercial Account Manager route.';
    return salesLeaderboardSort.key==='overall'?`${row.name} currently leads the sales suitability leaderboard at ${row.overall}% overall fit.`:`${row.name} is currently leading for ${focus.toLowerCase()} at ${row.categories?.[salesLeaderboardSort.key]||0}%.`;
  }
  function leaderboardTableHtml(rows){
    const sortableKeys=['overall','experience','network','development','consultative','commercial'];const sortIcon=(key)=>salesLeaderboardSort.key===key?(salesLeaderboardSort.dir==='desc'?'↓':'↑'):'↕';
    const th=(label,key)=>sortableKeys.includes(key)?`<th><button class="leaderboard-sort-button ${salesLeaderboardSort.key===key?'active':''}" type="button" data-leader-sort="${key}">${label}<span>${sortIcon(key)}</span></button></th>`:`<th>${label}</th>`;
    return `<div class="leaderboard-table-scroll"><table class="leaderboard-table"><thead><tr><th>Rank</th><th>Candidate</th><th>Role</th>${th('Overall','overall')}${th('Experience','experience')}${th('Network','network')}${th('Development','development')}${th('Consultative','consultative')}${th('Commercial','commercial')}<th>Status</th><th>Actions</th></tr></thead><tbody>${rows.map((row,index)=>`<tr class="${index===0?'leader-row':''}"><td><span class="leader-rank ${index<3?'top-three':''}">${index+1}</span></td><td><div class="leader-name"><b>${escapeHtml(row.name)}</b><span>${escapeHtml(row.displayReference||'No reference')}</span></div></td><td>${escapeHtml(row.roleLabel)}</td><td><b>${row.overall}%</b></td><td>${row.categories.experience||0}%</td><td>${row.categories.network||0}%</td><td>${row.categories.development||0}%</td><td>${row.categories.consultative||0}%</td><td>${row.categories.commercial||0}%</td><td>${escapeHtml(queueStatusLabel(row.queueStatus))}</td><td><div class="leaderboard-row-actions"><button class="button button-secondary leaderboard-open-button" type="button" data-leader-open="${escapeHtml(row.source)}">Open</button><button class="button button-secondary leaderboard-remove-button" type="button" data-leader-remove="${escapeHtml(row.reference)}">Remove</button></div></td></tr>`).join('')}</tbody></table></div>`;
  }
  function renderSalesLeaderboard(){
    const wrap=$('sales-leaderboard-wrap');if(!wrap)return;const count=$('sales-leaderboard-count'),winnerName=$('leaderboard-winner-name'),winnerRole=$('leaderboard-winner-role'),winnerCopy=$('leaderboard-winner-copy'),winnerMetric=$('leaderboard-winner-score');
    const active=salesLeaderboardRows.filter(r=>!r.leaderboardHidden).sort(salesLeaderboardComparator()),removed=salesLeaderboardRows.filter(r=>r.leaderboardHidden).sort((a,b)=>String(b.submittedAt).localeCompare(String(a.submittedAt)));
    if(count)count.textContent=`${active.length} ranked sales candidate${active.length===1?'':'s'}`;const top=active[0]||null;
    if(winnerName)winnerName.textContent=top?top.name:'Waiting for sales submissions';if(winnerRole)winnerRole.textContent=top?`${top.roleLabel} · ${top.displayReference}`:'Commercial Account Manager leaderboard';if(winnerMetric)winnerMetric.textContent=top?(salesLeaderboardSort.key==='overall'?`${top.overall}% overall fit`:`${top.categories?.[salesLeaderboardSort.key]||0}% ${salesLeaderboardCategoryName(salesLeaderboardSort.key).toLowerCase()}`):'No ranked submissions yet';if(winnerCopy)winnerCopy.textContent=leaderboardWinnerCopy(top);
    wrap.innerHTML=active.length?leaderboardTableHtml(active):'<div class="leaderboard-empty"><b>No ranked sales reports currently visible.</b><span>Completed Commercial Account Manager reports appear automatically unless archived, not eligible, or manually removed.</span></div>';
    wrap.querySelectorAll('[data-leader-sort]').forEach(button=>button.addEventListener('click',()=>setSalesLeaderboardSort(button.dataset.leaderSort)));wrap.querySelectorAll('[data-leader-open]').forEach(button=>button.addEventListener('click',()=>openLeaderboardRecord(button.dataset.leaderOpen)));wrap.querySelectorAll('[data-leader-remove]').forEach(button=>button.addEventListener('click',()=>setLeaderboardVisibility(button.dataset.leaderRemove,true)));
    const removedWrap=$('sales-leaderboard-removed'),removedList=$('sales-leaderboard-removed-list');if(removedWrap&&removedList){removedWrap.hidden=!removed.length;removedList.innerHTML=removed.map(row=>`<div class="leaderboard-removed-row"><div><b>${escapeHtml(row.name)}</b><span>${escapeHtml(row.displayReference)} · ${row.overall}% overall</span></div><button class="button button-secondary" type="button" data-leader-restore="${escapeHtml(row.reference)}">Restore</button></div>`).join('');removedList.querySelectorAll('[data-leader-restore]').forEach(button=>button.addEventListener('click',()=>setLeaderboardVisibility(button.dataset.leaderRestore,false)));}
  }
  function updateReportLeaderboardControl(record){
    const section=$('report-leaderboard-control'),button=$('report-leaderboard-toggle'),copy=$('report-leaderboard-copy');if(!section||!button||!copy){return;}
    const ref=record?.reference||record?.code||'';const row=salesLeaderboardRows.find(r=>r.reference===ref);const sales=row||record?.assessmentTrack==='account_manager'||record?.assessment?.assessmentTrack==='account_manager'||record?.application?.role==='Commercial Account Manager';
    if(!sales||['archived','background_not_eligible'].includes(record?.queueStatus||'')){section.hidden=true;return;}
    section.hidden=false;const hidden=!!row?.leaderboardHidden;section.dataset.reference=ref;section.dataset.hidden=String(hidden);copy.textContent=hidden?'This report is removed from the league table only. Its filing location has not changed.':'This completed sales report is included in the league table. Removing it will not change its filing location or report status.';button.textContent=hidden?'Restore to league table':'Remove from league table';button.dataset.leaderboardAction=hidden?'restore':'hide';
  }


  async function populateStoredApplicants(){
    const select=$('stored-applicant-select'); if(!select) return;
    select.disabled=true; select.innerHTML='<option value="">Loading shared submissions…</option>';
    if(!adminAccessPin){ select.innerHTML='<option value="">Administrator access required</option>'; return; }
    try{
      const standardStatuses=['pending','actioned','archived'];
      const advancedStatuses=['background_to_action','background_eligible','background_not_eligible','employment_contracts','signed_employment_contracts'];
      const statuses=dancoPlusActive()?[...standardStatuses,...advancedStatuses]:standardStatuses;
      if(!dancoPlusActive()&&advancedQueueStatus(currentQueueStatus))currentQueueStatus='pending';
      const responses=await Promise.all(statuses.map(status=>sharedRequest('/api/admin',{action:'list',status,adminPin:adminAccessPin})));
      const grouped=Object.fromEntries(statuses.map((status,index)=>[status,Array.isArray(responses[index].submissions)?responses[index].submissions:[]]));
      grouped && Object.entries(grouped).forEach(([status,list])=>{(Array.isArray(list)?list:[]).forEach(item=>{item.queueStatus=item.queueStatus||status;});});
      sharedQueueGroups=grouped;
      $$('[data-queue-status]').forEach(button=>{const status=button.dataset.queueStatus;button.classList.toggle('active',status===currentQueueStatus);const count=button.querySelector('[data-queue-count]');if(count)count.textContent=!dancoPlusActive()&&advancedQueueStatus(status)?'+':String(grouped[status]?.length||0);});
      sharedQueueRecords=grouped[currentQueueStatus]||[];
      select.innerHTML=sharedQueueRecords.length?'<option value="">Select a shared submission</option>':'<option value="">No submissions in this queue</option>';
      sharedQueueRecords.forEach(item=>{const option=document.createElement('option');option.value=`remote:${item.reference}`;const kind=item.recordType==='application'?'Application':'Assessment';const role=item.role?` · ${item.role}`:'';option.textContent=`${item.name||'Unnamed applicant'} — ${displayRecordReference(item)||item.reference} · ${kind}${role}`;select.appendChild(option);});
      $('shared-service-status').textContent='Live shared list · available on every authorized device';
      select.disabled=false;
      await refreshSalesLeaderboard();
      await populateBackgroundReportFolder(grouped);
    }catch(error){
      const localAll=storedApplications();
      const local=localAll.filter(item=>(item.queueStatus||'pending')===currentQueueStatus).sort((a,b)=>String(b.submittedAt).localeCompare(String(a.submittedAt)));
      sharedQueueGroups={pending:localAll.filter(item=>(item.queueStatus||'pending')==='pending'),actioned:localAll.filter(item=>item.queueStatus==='actioned'),archived:localAll.filter(item=>item.queueStatus==='archived')};
      salesLeaderboardRows=buildSalesLeaderboardRows(localAll);
      select.innerHTML=local.length?'<option value="">Shared service unavailable — local copies</option>':'<option value="">Shared service unavailable</option>';
      local.forEach(item=>{const option=document.createElement('option');option.value=`local:${item.code}`;option.textContent=`${item.name||'Unnamed applicant'} — local copy`;select.appendChild(option);});
      $('shared-service-status').textContent=error.message;
      select.disabled=false;
      renderSalesLeaderboard();
      await populateBackgroundReportFolder();
    }
  }
  async function storeCurrentApplication(){
    $('submit-error').textContent='';
    if(!session||session.status!=='complete'||!session.resultCode){ $('submit-error').textContent='No completed result is available to submit.'; return; }
    const button=$('confirm-submit'); button.disabled=true; button.textContent=settings.lang==='es'?'Enviando…':'Submitting…';
    const assessment={knowledgeAnswers:[...(session.knowledgeAnswers||[])],profileSkipped:!!session.profileSkipped,profileAnswers:[...(session.profileAnswers||[])],assessmentTrack:activeAssessmentTrack(),lang:session.lang,audio:!!session.audio,supportReason:normaliseSupportReason(session.supportReason)};
    const record={recordType:session.mode==='application'?'application':'assessment',resultCode:session.resultCode,name:session.name,application:session.mode==='application'?{...(session.application||{})}:{},assessment};
    try{
      if(inviteLiveMode()&&activeInvite?.status!=='completed'&&activeInvite?.status!=='submitted'){
        const completed=await inviteRequest({action:'complete',token:INVITE_TOKEN,resultCode:session.resultCode,draftRecord:{...record,resultCode:session.resultCode}});if(completed?.invite)activeInvite=completed.invite;
      }
      const response=await sharedRequest('/api/submissions',inviteLiveMode()?{record,inviteToken:INVITE_TOKEN}:{record});
      const saved=response.submission||{}; if(!saved.reference)throw new Error(t('submissionFailed'));
      const submittedAt=saved.submittedAt||new Date().toISOString();
      const applications=storedApplications();
      const localRecord={code:session.resultCode,reference:saved.reference,recordType:record.recordType,queueStatus:'pending',name:session.name,application:record.application,assessment,submittedAt};
      const existing=applications.findIndex(item=>normalizeCode(item.code)===normalizeCode(localRecord.code));
      if(existing>=0)applications[existing]=localRecord;else applications.unshift(localRecord);
      saveJson(APPLICATIONS_KEY,applications.slice(0,100));
      session.applicationSubmitted=true; session.submissionReference=saved.reference; session.submittedAt=submittedAt; saveSession();
      if(inviteLiveMode()){activeInvite={...(activeInvite||{}),status:'submitted',submissionReference:saved.reference,resultCode:session.resultCode};}
      closeModal('submit-modal'); renderResult(); if(adminAuthenticated)populateStoredApplicants(); toast(existing>=0?t('submissionAlreadySaved'):t('submissionSaved'));
    }catch(error){ $('submit-error').textContent=error.message||t('submissionFailed'); }
    finally{button.disabled=false;button.textContent=t('confirmSubmit');}
  }

  async function loadStoredApplicantFromSource(selected){
    if(!selected){ $('decode-error').textContent='Select a submission first.'; return; }
    let record;
    if(selected.startsWith('remote:')){const reference=selected.slice(7);const response=await sharedRequest('/api/admin',{action:'get',reference,adminPin:adminAccessPin});record=response.submission;currentSharedReference=reference;$('submission-status-actions').hidden=false;}
    else{record=findStoredApplication(selected.slice(6));currentSharedReference='';currentEmploymentContract=null;$('submission-status-actions').hidden=true;}
    if(!record)throw new Error('Submission was not found.');
    currentLoadedRecord=record; currentBackgroundScreening=record.backgroundScreening||null; currentEmploymentContract=record.employmentContract||null;
    const data=record.assessment?.knowledgeAnswers?record.assessment:decodeResult(record.resultCode||record.code); $('decode-error').textContent='';
    renderDashboard(data,{code:'',name:record.name,reference:displayRecordReference(record)||record.reference||record.code,application:record.recordType==='assessment'?null:(record.application||null),submittedAt:record.submittedAt,backgroundScreening:record.backgroundScreening||null,employmentContract:record.employmentContract||null});
    updateReportLeaderboardControl(record); renderBackgroundActions(record); renderEmploymentContractActions(record);
  }
  async function loadStoredApplicant(){
    const selected=$('stored-applicant-select').value;
    if(!selected){ $('decode-error').textContent='Select a submission first.'; return; }
    try{ await loadStoredApplicantFromSource(selected); }catch(error){ $('decode-error').textContent=error.message; $('dashboard-output').innerHTML=''; }
  }
  async function updateSharedStatus(status){
    if(!currentSharedReference)return;
    try{
      await sharedRequest('/api/admin',{action:'status',reference:currentSharedReference,status,adminPin:adminAccessPin});
      currentSharedReference='';currentLoadedRecord=null;currentBackgroundScreening=null;currentEmploymentContract=null;$('submission-status-actions').hidden=true;$('background-screening-actions').hidden=true;$('employment-contract-actions').hidden=true;$('signed-contract-actions').hidden=true;$('dashboard-output').innerHTML='';await populateStoredApplicants();toast(`Submission moved to ${status}.`);
    }catch(error){$('decode-error').textContent=error.message;}
  }

  function pushBits(bits,value,count){ for(let i=count-1;i>=0;i--) bits.push((value>>i)&1); }
  function readBits(bits,start,count){ let value=0; for(let i=0;i<count;i++) value=(value<<1)|(bits[start+i]||0); return value; }
  function bitsToBytes(bits){ const copy=[...bits]; while(copy.length%8) copy.push(0); const out=[]; for(let i=0;i<copy.length;i+=8) out.push(readBits(copy,i,8)); return out; }
  function bytesToBits(bytes){ const bits=[]; bytes.forEach(byte=>pushBits(bits,byte,8)); return bits; }
  function checksum(bits){ let h=0xA7; bits.forEach((bit,i)=>{ h=((h<<1)|(h>>7))&255; h^=bit?0x5D:0xB7; h=(h+i*13+29)&255; }); return h; }
  function base32Encode(bytes){ let bits=0,value=0,out=''; for(const byte of bytes){ value=(value<<8)|byte; bits+=8; while(bits>=5){ out+=CODE_ALPHABET[(value>>(bits-5))&31]; bits-=5; } } if(bits>0) out+=CODE_ALPHABET[(value<<(5-bits))&31]; return out; }
  function base32Decode(value){ let bits=0,buffer=0,out=[]; for(const char of value){ const index=CODE_ALPHABET.indexOf(char); if(index<0) throw new Error('Result code contains an invalid character.'); buffer=(buffer<<5)|index; bits+=5; if(bits>=8){ out.push((buffer>>(bits-8))&255); bits-=8; } } return out; }
  function randomByte(){ try{ const a=new Uint8Array(1); crypto.getRandomValues(a); return a[0]; }catch(_){ return Math.floor(Math.random()*256); } }
  function formatResultCode(raw){ return `DRA-${raw.match(/.{1,4}/g).join('-')}`; }
  function encodeResult(data){
    const bits=[]; pushBits(bits,VERSION,4); pushBits(bits,randomByte(),8);
    for(let i=0;i<10;i++) pushBits(bits,Number(data.knowledgeAnswers[i]||0),3);
    pushBits(bits,data.profileSkipped?0:1,1);
    for(let i=0;i<5;i++) pushBits(bits,data.profileSkipped?0:(DISC_INDEX[data.profileAnswers[i]]||0),3);
    pushBits(bits,data.lang==='es'?1:0,1); pushBits(bits,data.audio?1:0,1); pushBits(bits,Number(data.supportReason||0)&3,2);
    pushBits(bits,checksum(bits),8); const bytes=bitsToBytes(bits).map((b,i)=>b^XOR_STREAM[i]); return formatResultCode(base32Encode(bytes));
  }
  function decodeResult(code){
    const raw=String(code||'').toUpperCase().replace(/^\s*DRA[-\s]*/,'').replace(/[^A-Z2-9]/g,''); if(raw.length!==15) throw new Error('Result code is incomplete or from an unsupported version.');
    let bytes=base32Decode(raw); if(bytes.length<9) throw new Error('Result code is incomplete.'); bytes=bytes.slice(0,9).map((b,i)=>b^XOR_STREAM[i]); const bits=bytesToBits(bytes); let p=0;
    const version=readBits(bits,p,4);p+=4;if(![17,18,19].includes(version))throw new Error('This result code was created by a different assessment version.'); p+=8;
    const knowledgeAnswers=[];for(let i=0;i<10;i++){knowledgeAnswers.push(readBits(bits,p,3));p+=3;}
    const profileCompleted=readBits(bits,p,1)===1;p+=1;const profileAnswers=[];for(let i=0;i<5;i++){profileAnswers.push(DISC_CODE[readBits(bits,p,3)]||'');p+=3;}
    const lang=readBits(bits,p,1)?'es':'en';p+=1;const audio=readBits(bits,p,1)===1;p+=1;const supportReason=readBits(bits,p,2);p+=2;const expected=checksum(bits.slice(0,p));const received=readBits(bits,p,8);
    if(expected!==received)throw new Error('Result code is invalid or has been mistyped.');
    if(knowledgeAnswers.some(value=>value<0||value>4))throw new Error('Result code contains invalid answer data.');
    return {knowledgeAnswers,profileSkipped:!profileCompleted,profileAnswers,lang,audio,supportReason};
  }

  function scoreAssessment(answers){
    const tiers={foundation:[0,0],roofer:[0,0],foreman:[0,0]},cats={materials:[0,0],installation:[0,0],service:[0,0],safety:[0,0],supervision:[0,0]}; let correct=0,criticalWrong=0,timeouts=0;
    const breakdown=QUESTIONS.map(q=>{ const answer=Number(answers[q.id-1]||0); const ok=answer===q.correct+1; tiers[q.tier][1]++;cats[q.cat][1]++; if(ok){correct++;tiers[q.tier][0]++;cats[q.cat][0]++;}else{if(q.critical)criticalWrong++;if(!answer)timeouts++;} return {q,answer,ok}; });
    const pct=pair=>pair[1]?Math.round(pair[0]/pair[1]*100):0; const tierPct=Object.fromEntries(Object.entries(tiers).map(([k,v])=>[k,pct(v)])); const catPct=Object.fromEntries(Object.entries(cats).map(([k,v])=>[k,pct(v)])); const overall=correct*10;
    const safety=catPct.safety;
    let recommendation='Service Helper interview track', rationale='Best aligned to an entry pathway with structured onboarding and practical coaching.';
    if(overall>=80&&tiers.foundation[0]>=2&&tiers.roofer[0]>=3&&tiers.foreman[0]>=2&&criticalWrong===0){recommendation='Foreman interview track';rationale='Strong progressive evidence across foundation, practical roofing and supervisory decision-making, with both critical safety responses correct.';}
    else if(overall>=60&&tiers.foundation[0]>=2&&tiers.roofer[0]>=2&&criticalWrong<=1){recommendation='Roofer interview track';rationale='Sufficient foundation and practical roofing evidence for a roofer-focused interview, with any gaps suitable for verification or coaching.';}
    const roles={
      'Service Helper':Math.round(.65*tierPct.foundation+.35*overall),
      'Roofer':Math.max(0,Math.round(.25*tierPct.foundation+.6*tierPct.roofer+.15*safety)-(criticalWrong?8:0)),
      'Foreman':Math.max(0,Math.round(.15*tierPct.foundation+.3*tierPct.roofer+.4*tierPct.foreman+.15*safety)-(criticalWrong*12))
    };
    return {correct,overall,tierPct,catPct,criticalWrong,timeouts,recommendation,rationale,roles,breakdown};
  }

  function scoreSalesAssessment(answers){
    const styles={driver:0,relationship:0,technical:0,strategic:0};
    const categories={experience:[0,0],network:[0,0],development:[0,0],consultative:[0,0],commercial:[0,0]};
    let suitability=0,answered=0;
    const categoryFor=id=>id===1?'experience':id===2?'network':id<=4?'development':id===5?'consultative':id<=6?'commercial':id<=7?'development':id===8?'commercial':id===9?'development':'consultative';
    const breakdown=SALES_QUESTIONS.map(q=>{
      const answer=Number(answers[q.id-1]||0); const option=answer?q.options[answer-1]:null; const fit=Number(option?.fit||0);
      suitability+=q.weight*(fit/100); if(answer)answered++;
      const cat=categoryFor(q.id); categories[cat][1]+=q.weight; categories[cat][0]+=q.weight*(fit/100);
      (option?.styles||[]).forEach(style=>{ if(styles[style]!==undefined)styles[style]+=q.weight/Math.max(1,option.styles.length); });
      return {q,answer,option,fit,indicator:!answer?'Timed out / no answer':fit>=85?'Strong indicator':fit>=65?'Positive indicator':fit>=45?'Mixed indicator':'Weak indicator'};
    });
    suitability=Math.round(suitability);
    const categoryPct=Object.fromEntries(Object.entries(categories).map(([k,[score,max]])=>[k,max?Math.round(score/max*100):0]));
    const styleInfo={
      driver:{label:'Driver / Hunter',copy:'Fast-moving, target-focused and comfortable creating momentum. Strongest when balanced with discovery, accuracy and margin discipline.'},
      relationship:{label:'Relationship Builder',copy:'Network-led, communicative and effective at earning access and maintaining trust over longer account cycles.'},
      technical:{label:'Technical Consultant',copy:'Credibility-led and detail-aware, with a preference for accurate solutions and involving specialist expertise when needed.'},
      strategic:{label:'Strategic Account Developer',copy:'Methodical and long-cycle oriented, with emphasis on territory planning, pipeline quality, next actions and disciplined account development.'}
    };
    const ranked=Object.entries(styles).sort((a,b)=>b[1]-a[1]); const primary=ranked[0]?.[0]||'strategic',secondary=ranked[1]?.[0]||'relationship';
    const salesType={primary:styleInfo[primary],secondary:styleInfo[secondary],scores:styles};
    let recommendation='Low indicated fit — substantial evidence required before progressing';
    if(suitability>=85)recommendation='Exceptional indicated potential — priority face-to-face interview';
    else if(suitability>=70)recommendation='Strong indicated potential — progress to face-to-face interview';
    else if(suitability>=55)recommendation='Moderate indicated potential — explore strengths and gaps at interview';
    else if(suitability>=40)recommendation='Limited indicated fit — verify experience, network and sales discipline carefully';
    const rationale=`Suitability is an advisory ${suitability}% estimate derived from commercial experience, transferable relationships, business-development approach, technical credibility, commercial judgment and sales discipline. It is not a hiring decision.`;
    return {suitability,answered,recommendation,rationale,categoryPct,salesType,breakdown};
  }

  function personalityResult(data){
    if(data.profileSkipped) return null; const counts={D:0,I:0,S:0,C:0}; data.profileAnswers.forEach(code=>{if(counts[code]!==undefined)counts[code]++;});
    const ordered=Object.entries(counts).sort((a,b)=>b[1]-a[1]); const main=ordered[0][0],second=ordered[1][0],blend=ordered[0][1]-ordered[1][1]<=1; const codes=blend?[main,second]:[main];
    const info={D:{name:'Red · Direct',color:'#d9474f',guidance:'Be concise, lead with the goal and key action, offer practical choices, and give room for ownership.'},I:{name:'Yellow · Interactive',color:'#e7ad20',guidance:'Use a friendly conversational approach, invite ideas, acknowledge enthusiasm, and confirm the agreed next step.'},S:{name:'Green · Supportive',color:'#2a9a68',guidance:'Use a calm, considerate pace, explain changes early, provide reassurance, and allow time for questions.'},C:{name:'Blue · Considered',color:'#2473cf',guidance:'Provide accurate detail, clear standards and organized instructions, and allow time to check or clarify information.'}};
    const label=codes.map(code=>info[code].name).join(' / '); const guidance=codes.map(code=>info[code].guidance).join(' '); const color=codes.length>1?`linear-gradient(135deg,${info[codes[0]].color},${info[codes[1]].color})`:info[main].color;
    return {short:codes.join('/'),label,guidance,color,counts};
  }
  function answerText(q,value,lang='en'){ return value? q.options[value-1]?.[lang] || 'Invalid answer' : 'Timed out / no answer'; }

  function roofingSuitabilityBrief(result,application){
    const catLabels={materials:'materials knowledge',installation:'installation technique',service:'service diagnosis',safety:'safety judgment',supervision:'supervision'};
    const sorted=Object.entries(result.catPct).sort((a,b)=>b[1]-a[1]);
    const strongest=catLabels[sorted[0]?.[0]]||'practical roofing knowledge';
    const weakest=catLabels[sorted[sorted.length-1]?.[0]]||'role-specific detail';
    const target=result.recommendation.replace(' interview track','');
    const strength=result.overall>=80?'strong':result.overall>=60?'credible':result.overall>=40?'developing':'limited';
    const safety=result.criticalWrong?` ${result.criticalWrong} critical safety response${result.criticalWrong===1?' requires':'s require'} direct interview verification.`:' Critical safety responses were completed without a recorded gap.';
    const roleNote=application?.role?` They applied for ${application.role}; the assessment currently points most strongly toward the ${target} interview path.`:` The assessment currently points most strongly toward the ${target} interview path.`;
    return `This applicant shows ${strength} indicated role readiness, with the strongest evidence in ${strongest} and the clearest interview need around ${weakest}.${roleNote}${safety}`;
  }
  function salesSuitabilityBrief(result){
    const labels={experience:'commercial sales experience',network:'transferable construction relationships',development:'new-business development',consultative:'consultative and technical selling',commercial:'commercial discipline'};
    const sorted=Object.entries(result.categoryPct).sort((a,b)=>b[1]-a[1]);
    const strongest=labels[sorted[0]?.[0]]||'commercial selling';
    const second=labels[sorted[1]?.[0]]||'business development';
    const weakest=labels[sorted[sorted.length-1]?.[0]]||'commercial discipline';
    const tier=result.suitability>=85?'exceptional':result.suitability>=70?'strong':result.suitability>=55?'moderate':result.suitability>=40?'limited':'low';
    return `This applicant shows ${tier} indicated suitability for Danco's Commercial Account Manager role at ${result.suitability}%. Their strongest evidence sits in ${strongest} and ${second}, with a ${result.salesType.primary.label.toLowerCase()} primary sales approach. The face-to-face interview should verify the depth of ${weakest}, the portability of claimed relationships, and recent evidence of personally won commercial business.`;
  }
  function roofingInterviewQuestions(result,disc){
    const map={
      materials:{q:'Which roofing systems do you work with most confidently?',tags:['Materials','Experience','Depth']},
      installation:{q:'Talk me through an installation detail you personally owned.',tags:['Installation','Workmanship','Evidence']},
      service:{q:'How do you diagnose a leak before proposing a repair?',tags:['Service','Problem solving','Process']},
      safety:{q:'Describe a time you stopped work for a safety concern.',tags:['Safety','Judgment','Confidence']},
      supervision:{q:'How do you keep a crew on standard when conditions change?',tags:['Supervision','Communication','Standards']}
    };
    const ordered=Object.entries(result.catPct).sort((a,b)=>a[1]-b[1]).map(([k])=>k);
    const picks=[];
    if(result.criticalWrong)picks.push(map.safety);
    ordered.forEach(k=>{if(picks.length<3&&!picks.includes(map[k]))picks.push(map[k]);});
    const roleQ=result.recommendation.startsWith('Foreman')?{q:'What would your crew say you do when production falls behind?',tags:['Leadership','Pressure','Accountability']}:result.recommendation.startsWith('Roofer')?{q:'Which tasks can you complete independently from day one?',tags:['Role readiness','Independence','Training need']}:{q:'What practical skills would you want to build first at Danco?',tags:['Development','Coachability','Entry readiness']};
    picks.push(roleQ);
    if(picks.length<4&&disc)picks.push({q:'What management style gets the best work from you?',tags:['Work style','Communication','Engagement']});
    return picks.slice(0,4);
  }
  function salesInterviewQuestions(result){
    const map={
      experience:{q:'What commercial accounts have you personally won and retained?',tags:['Experience','Ownership','Evidence']},
      network:{q:'Which relationships could realistically open doors in this territory?',tags:['Network','Portability','Territory']},
      development:{q:'How would you build a 90-day new-business pipeline here?',tags:['Prospecting','Planning','Cadence']},
      consultative:{q:'How do you sell when technical support is needed to close?',tags:['Discovery','Credibility','Teamwork']},
      commercial:{q:'How do you protect margin when a strong prospect pushes on price?',tags:['Value','Margin','Judgment']}
    };
    const ordered=Object.entries(result.categoryPct).sort((a,b)=>a[1]-b[1]).map(([k])=>k);
    const picks=ordered.slice(0,3).map(k=>map[k]);
    const style=result.salesType.primary.label;
    const styleQ=style.startsWith('Driver')?{q:'When does persistence become pressure with a prospect?',tags:['Sales style','Self-awareness','Judgment']}:style.startsWith('Relationship')?{q:'How do you turn a strong relationship into measurable pipeline?',tags:['Sales style','Conversion','Account growth']}:style.startsWith('Technical')?{q:'How do you avoid over-selling the technical detail?',tags:['Sales style','Commercial focus','Communication']}:{q:'How do you keep planning from slowing prospecting activity?',tags:['Sales style','Execution','Pace']};
    picks.push(styleQ);
    return picks.slice(0,4);
  }
  function suitabilityBriefHtml(text){return `<section class="candidate-brief-card"><span class="eyebrow">OVERALL SUITABILITY BRIEF</span><h3>Assessment-led hiring direction</h3><p>${escapeHtml(text)}</p></section>`;}
  function interviewQuestionsHtml(items){return `<section class="interview-guidance-card"><div><span class="eyebrow">INTERVIEW DIRECTION</span><h3>Suggested follow-up questions</h3><p class="fine">Short prompts generated from this applicant's assessment indicators. Use them as fact-finding direction, not a fixed interview script.</p></div><div class="interview-question-grid">${items.map((item,i)=>`<div class="interview-question"><b>${i+1}. ${escapeHtml(item.q)}</b><div class="interview-tags">${item.tags.map(tag=>`<span>${escapeHtml(tag)}</span>`).join('')}</div></div>`).join('')}</div></section>`;}

  function renderDashboard(data,{demo=false,name='',reference='',code='',application=null,submittedAt='',backgroundScreening=null,employmentContract=null}={}){
    const sales=(application?.role==='Commercial Account Manager')||data?.assessmentTrack==='account_manager';
    const disc=personalityResult(data); const language=data.lang==='es'?'Spanish':'English'; const supportInfo=supportReportInfo(data);
    const applicantMeta=[reference,language,supportInfo.label,code].filter(Boolean).map(escapeHtml).join(' · ');
    const applicationFields=application?[
      ['Position applied for',application.role],['Open to other roles',application.otherRoles],['Email',application.email],['Phone',application.phone],
      ['Street address',application.address],['City',application.city],['State',application.state],['ZIP code',application.zip],['Date of birth',application.dateOfBirth],
      ['Social Security number',application.ssnPrototypeBypass?'PROTOTYPE BYPASS':application.ssnStatus==='valid'?`•••-••-${application.ssnLast4||'----'}`:'Not valid / not provided'],
      ...(application.ssnStatus==='invalid_or_missing_accepted'?[['SSN exception reason',application.ssnMissingReason],...(application.ssnMissingReasonOther?[['SSN exception detail',application.ssnMissingReasonOther]]:[])]:[]),
      ['Available start date',application.availability],[sales?'Commercial / construction sales experience':'Commercial roofing experience',application.experience],
      ['U.S. work authorization',application.authorization],['Valid driver’s license',application.license],['Background screening consent',application.backgroundConsent],
      ...(application.backgroundConsent==='No'?[['Reason provided',application.backgroundConsentReason]]:[])
    ]:[];
    const bg=backgroundScreening||null;
    const bgFailed=bg?.decision==='not_eligible';
    const bgPassed=bg?.decision==='eligible';
    const bgDecisionLabel=bgFailed?'DOES NOT MEET DANCO CRITERIA':bgPassed?'MEETS DANCO CRITERIA':bg?.decision?bg.decision.replaceAll('_',' ').toUpperCase():'TO ACTION';
    let backgroundHtml=application?`<section class="background-report-card ${bgFailed?'background-report-failed':bgPassed?'background-report-passed':''}"><div class="background-report-heading"><div><small>BACKGROUND SCREENING</small><h3>${bg?'Screening record':'Not yet requested'}</h3></div><span class="background-status-pill">${escapeHtml(backgroundStatusLabel(bg))}</span></div>${bg?`${bgFailed?'<div class="background-failure-alert"><b>BACKGROUND CHECK ERROR · CONTRACT CREATION BLOCKED</b><span>This demonstration result is filed as Background checked — Not eligible. Senior review is required before the candidate can progress.</span></div>':bgPassed?'<div class="background-success-alert"><b>BACKGROUND CHECK DEMO · CRITERIA MET</b><span>This demonstration result has been filed automatically as Background checked — Eligible.</span></div>':''}<div class="background-meta-grid"><div><span>Provider</span><b>${escapeHtml(bg.provider||'Provider to be selected')}</b></div><div><span>Package</span><b>${escapeHtml(bg.packageLabel||'Employment background screen')}</b></div><div><span>Approved cost</span><b>${bg.quotedCost?`$${Number(bg.quotedCost).toFixed(2)} ${escapeHtml(bg.currency||'USD')}`:'Not recorded'}</b></div><div><span>${bg.mode==='prototype_demo'?'Prototype outcome':'Reviewer decision'}</span><b>${escapeHtml(bgDecisionLabel)}</b></div></div><div class="background-result-grid">${Object.values(demoBackgroundDisplayResults(bg)).map(item=>`<div><span>${escapeHtml(item.label||'Screening category')}</span><b>${escapeHtml(item.result||'Status unavailable')}</b></div>`).join('')}</div><p class="fine">${bg.mode==='prototype_demo'?'Prototype demonstration only. The pass/fail outcome above was deliberately selected by the reviewer to demonstrate workflow behavior; no third-party screening was ordered and no charge was made. The applicant report shows status only. The full demonstration report is filed separately under Background Check Reports; a live vendor would supply the authoritative detailed report.':'Live screening status summary. Detailed provider reports and sensitive source records should remain in the approved screening environment and be accessed only by authorized staff.'}</p><div class="background-file-location"><span>FULL REPORT</span><b>Filed under Background Check Reports · ${escapeHtml(reference||'application reference')}</b></div>`:`<p>The applicant's consent response is stored with the application. An authorized Danco reviewer can start the prototype background-screening workflow after reviewing the assessment.</p>`}</section>`:'';
    if(application&&!dancoPlusActive()) backgroundHtml=`<section class="danco-plus-report-teaser"><div class="danco-plus-mark small"><b>Danco+</b><span>LOCKED</span></div><div><small>OPTIONAL ADVANCED HIRING WORKFLOW</small><h3>Continue beyond assessment when Danco is ready</h3><p>Integrated background screening, offer-document creation and secure employment-file progression are available in the owner-approved Danco+ trial.</p></div></section>`;
    const ec=employmentContract||currentEmploymentContract||null;
    const contractHtml=application&&ec?`<section class="background-report-card contract-report-card"><div class="background-report-heading"><div><small>EMPLOYMENT CONTRACT</small><h3>${escapeHtml(ec.contractReference||'Contract created')}</h3></div><span class="background-status-pill">${ec.signedStoragePath?'SIGNED FILE UPLOADED':'CONTRACT CREATED'}</span></div><div class="background-meta-grid"><div><span>Role offered</span><b>${escapeHtml(ec.offeredRole||'Not recorded')}</b></div><div><span>Created by</span><b>${escapeHtml(ec.createdBy||'Danco administrator')}</b></div><div><span>Created</span><b>${escapeHtml(ec.createdAt?new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short'}).format(new Date(ec.createdAt)):'Not recorded')}</b></div><div><span>Signed document</span><b>${escapeHtml(ec.signedFilename||'Awaiting signed upload')}</b></div></div></section>`:'';
    const contractDisplayHtml=dancoPlusActive()?contractHtml:'';

    if(sales){
      const result=scoreSalesAssessment(data.knowledgeAnswers);
      const categoryNames={experience:'Commercial sales experience',network:'Transferable construction network',development:'New-business & territory development',consultative:'Consultative / technical selling',commercial:'Commercial discipline'};
      const overallBrief=salesSuitabilityBrief(result);
      const interviewQuestions=salesInterviewQuestions(result);
      $('dashboard-output').innerHTML=`
        ${demo?'<div class="dashboard-banner">Example report only — these results do not belong to an applicant.</div>':''}
        ${application?`<section class="application-details-card"><div class="application-details-heading"><div><small>JOB APPLICANT · COMMERCIAL ACCOUNT MANAGER</small><h3>${escapeHtml(name||'Applicant name not supplied')}</h3></div><span>${escapeHtml(reference||'')}</span></div><div class="application-details-grid">${applicationFields.map(([label,value])=>`<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value||'Not supplied')}</b></div>`).join('')}</div>${submittedAt?`<p class="application-stored-at">Submitted to shared review: ${escapeHtml(new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short'}).format(new Date(submittedAt)))}</p>`:''}</section>`:''}
        ${suitabilityBriefHtml(overallBrief)}
        <div class="dashboard-summary sales-dashboard-summary"><div class="score-ring" style="--score:${result.suitability}%"><div><b>${result.suitability}%</b><span>SALES SUITABILITY</span></div></div><div class="recommendation-card"><small>COMMERCIAL ACCOUNT MANAGER</small><h3>${escapeHtml(result.recommendation)}</h3><p>${escapeHtml(result.rationale)}</p></div></div>
        <div class="metric-grid"><div class="metric-card"><b>${result.answered}/10</b><span>Scenarios answered</span></div><div class="metric-card"><b>${escapeHtml(result.salesType.primary.label)}</b><span>Primary sales approach</span></div><div class="metric-card"><b>${escapeHtml(result.salesType.secondary.label)}</b><span>Secondary sales approach</span></div></div>
        <div class="metric-card"><b>${escapeHtml(name||'Applicant name not supplied')}</b><span>${applicantMeta}</span></div>
        ${data.audio?`<div class="accessibility-report-card"><span>ACCESSIBILITY &amp; AUDIO SUPPORT</span><b>${escapeHtml(supportInfo.label)}</b><p>${escapeHtml(supportInfo.detail)}</p></div>`:''}
        <h3>Sales suitability indicators</h3><div class="bar-list">${Object.entries(result.categoryPct).map(([key,value])=>`<div class="bar-row"><span>${categoryNames[key]}</span><div class="bar"><i style="width:${value}%"></i></div><b>${value}%</b></div>`).join('')}</div>
        <div class="sales-style-card"><div><small>PRIMARY SALES APPROACH</small><h3>${escapeHtml(result.salesType.primary.label)}</h3><p>${escapeHtml(result.salesType.primary.copy)}</p></div><div><small>SECONDARY INFLUENCE</small><h3>${escapeHtml(result.salesType.secondary.label)}</h3><p>${escapeHtml(result.salesType.secondary.copy)}</p></div><p class="fine">Advisory behavioral sales-style estimate only. It is not a psychometric diagnosis and should be tested through structured interview, references and real sales evidence.</p></div>
        ${disc?`<div class="disc-card"><div class="disc-swatch" style="background:${disc.color}">${disc.short}</div><div><h3>Estimated engagement profile: ${escapeHtml(disc.label)}</h3><p>${escapeHtml(disc.guidance)}</p><p class="fine">The general work-style primer is separate from the sales-suitability score.</p></div></div>`:'<div class="disc-card"><div class="disc-swatch" style="background:#718198">—</div><div><h3>Work-style primer not completed</h3><p>The applicant chose to skip the optional questions.</p></div></div>'}
        <h3 class="breakdown-title">Commercial scenario breakdown</h3><table class="breakdown-table"><thead><tr><th>#</th><th>Area</th><th>Question</th><th>Applicant response</th><th>Indicator</th></tr></thead><tbody>${result.breakdown.map(({q,answer,option,indicator})=>`<tr><td>${q.id}</td><td>${escapeHtml(q.catLabel.en)}</td><td>${escapeHtml(q.en)}</td><td>${escapeHtml(answer?option?.en||'Invalid answer':'Timed out / no answer')}</td><td class="${indicator==='Strong indicator'?'result-good':indicator==='Weak indicator'?'result-bad':''}">${escapeHtml(indicator)}</td></tr>`).join('')}</tbody></table>
        ${backgroundHtml}
        ${contractDisplayHtml}
        ${interviewQuestionsHtml(interviewQuestions)}`;
      return;
    }

    const result=scoreAssessment(data.knowledgeAnswers);
    const overallBrief=roofingSuitabilityBrief(result,application);
    const interviewQuestions=roofingInterviewQuestions(result,disc);
    $('dashboard-output').innerHTML=`
      ${demo?'<div class="dashboard-banner">Example report only — these results do not belong to an applicant.</div>':''}
      ${application?`<section class="application-details-card"><div class="application-details-heading"><div><small>JOB APPLICANT</small><h3>${escapeHtml(name||'Applicant name not supplied')}</h3></div><span>${escapeHtml(reference||'')}</span></div><div class="application-details-grid">${applicationFields.map(([label,value])=>`<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value||'Not supplied')}</b></div>`).join('')}</div>${submittedAt?`<p class="application-stored-at">Submitted to shared review: ${escapeHtml(new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short'}).format(new Date(submittedAt)))}</p>`:''}</section>`:''}
      ${suitabilityBriefHtml(overallBrief)}
      <div class="dashboard-summary"><div class="score-ring" style="--score:${result.overall}%"><div><b>${result.overall}%</b><span>KNOWLEDGE SCORE</span></div></div><div class="recommendation-card"><small>RECOMMENDED INTERVIEW PATH</small><h3>${escapeHtml(result.recommendation)}</h3><p>${escapeHtml(result.rationale)}</p></div></div>
      <div class="metric-grid"><div class="metric-card"><b>${result.correct}/10</b><span>Correct responses</span></div><div class="metric-card"><b>${result.criticalWrong}</b><span>Critical safety gaps</span></div><div class="metric-card"><b>${result.timeouts}</b><span>Timed out / unanswered</span></div></div>
      <div class="metric-card"><b>${escapeHtml(name||'Applicant name not supplied')}</b><span>${applicantMeta}</span></div>
      ${data.audio?`<div class="accessibility-report-card"><span>ACCESSIBILITY &amp; AUDIO SUPPORT</span><b>${escapeHtml(supportInfo.label)}</b><p>${escapeHtml(supportInfo.detail)}</p></div>`:''}
      <h3>Role-alignment indicators</h3><div class="bar-list">${Object.entries(result.roles).map(([label,value])=>`<div class="bar-row"><span>${label}</span><div class="bar"><i style="width:${value}%"></i></div><b>${value}%</b></div>`).join('')}</div>
      <h3>Progressive assessment tiers</h3><div class="bar-list">${Object.entries(result.tierPct).map(([key,value])=>`<div class="bar-row"><span>${TEXT.en.tiers[key]}</span><div class="bar"><i style="width:${value}%"></i></div><b>${value}%</b></div>`).join('')}</div>
      ${disc?`<div class="disc-card"><div class="disc-swatch" style="background:${disc.color}">${disc.short}</div><div><h3>Estimated engagement profile: ${escapeHtml(disc.label)}</h3><p>${escapeHtml(disc.guidance)}</p><p class="fine">Advisory estimate from five friendly preference questions; it is not a diagnostic personality test and should not be used as a pass/fail criterion.</p></div></div>`:'<div class="disc-card"><div class="disc-swatch" style="background:#718198">—</div><div><h3>Work-style primer not completed</h3><p>The applicant chose to skip the optional questions. No profile inference has been made.</p></div></div>'}
      <h3 class="breakdown-title">Question breakdown</h3><table class="breakdown-table"><thead><tr><th>#</th><th>Tier</th><th>Question</th><th>Applicant response</th><th>Outcome</th></tr></thead><tbody>${result.breakdown.map(({q,answer,ok})=>`<tr><td>${q.id}</td><td>${TEXT.en.tiers[q.tier]}${q.critical?' · Critical':''}</td><td>${escapeHtml(q.en)}</td><td>${escapeHtml(answerText(q,answer,'en'))}</td><td class="${ok?'result-good':'result-bad'}">${ok?'Correct':answer?'Incorrect':'Timed out'}</td></tr>`).join('')}</tbody></table>
      ${backgroundHtml}
      ${contractDisplayHtml}
      ${interviewQuestionsHtml(interviewQuestions)}`;
  }


  function renderBackgroundActions(record){
    const panel=$('background-screening-actions'); if(!panel)return;
    const application=record?.recordType==='assessment'?null:record?.application;
    panel.hidden=!application||!currentSharedReference;
    if(panel.hidden)return;
    const consent=application?.backgroundConsent||''; const screening=record?.backgroundScreening||currentBackgroundScreening;
    const ssnReady=application?.ssnStatus==='valid'||application?.ssnPrototypeBypass===true||application?.ssnStatus==='prototype';
    if(!dancoPlusActive()){
      panel.classList.add('advanced-locked');
      $('background-action-copy').innerHTML='<b>Danco+ feature.</b> Demonstrate a controlled background-screening request, visible provider cost approval, pass/fail workflow behavior and automatic candidate filing.';
      $('request-background-check').disabled=false;$('request-background-check').textContent='Request Danco+ · Background screening';$('background-decision-actions').hidden=true;return;
    }
    panel.classList.remove('advanced-locked');
    const noSsnMessage='Unable to request a background check on this applicant due to no Social Security number being provided. Danco does not recognize or accept no Social Security number background checks.';
    if(consent==='Yes'&&ssnReady){
      if(screening?.decision==='not_eligible'){
        $('background-action-copy').innerHTML='<b class="danger-copy">Background check does not meet Danco criteria.</b> The candidate has been filed automatically under Background checked — Not eligible. Contract creation is blocked for this record.';
      }else if(screening?.decision==='eligible'){
        $('background-action-copy').innerHTML='<b>Background check criteria met.</b> The candidate has been filed automatically under Background checked — Eligible. You may re-run the demonstration to show the alternate outcome.';
      }else{
        $('background-action-copy').innerHTML='<b>Applicant consent and SSN requirement recorded.</b> This candidate can be progressed to the background-screening demonstration.';
      }
    }else if(consent==='Yes'){
      $('background-action-copy').innerHTML=`<b>Background check unavailable.</b> ${escapeHtml(noSsnMessage)}`;
    }else if(consent==='No'){
      $('background-action-copy').innerHTML=`<b>Applicant declined background screening.</b> ${escapeHtml(application?.backgroundConsentReason||'No reason supplied.')}`;
    }else{
      $('background-action-copy').innerHTML='<b>No background-screening consent response is stored.</b>';
    }
    $('request-background-check').disabled=consent!=='Yes'||!ssnReady;
    $('request-background-check').textContent=screening?'Run another background check demo':'Request background check';
    // Prototype outcomes auto-file. Manual decision controls are retained only for future live/provider review.
    $('background-decision-actions').hidden=!screening||screening.mode==='prototype_demo';
  }

  function selectedBackgroundProvider(){
    const providers=Array.isArray(backgroundQuote?.providers)&&backgroundQuote.providers.length?backgroundQuote.providers:BACKGROUND_DEMO_FALLBACK.providers.map(name=>({name,packages:BACKGROUND_DEMO_FALLBACK.packages}));
    const providerName=$('background-provider-select')?.value||providers[0]?.name||'Checkr';
    return providers.find(x=>x.name===providerName)||providers[0];
  }
  function selectedBackgroundPackage(){
    const provider=selectedBackgroundProvider();
    const packages=provider?.packages||backgroundQuote?.packages||BACKGROUND_DEMO_FALLBACK.packages;
    const code=$('background-package-select')?.value||packages[0]?.code;
    return packages.find(x=>x.code===code)||packages[0];
  }
  function refreshBackgroundPackageUi(){
    const provider=selectedBackgroundProvider();
    const packageSelect=$('background-package-select');
    const packages=provider?.packages||backgroundQuote?.packages||BACKGROUND_DEMO_FALLBACK.packages;
    if(packageSelect&&(!packageSelect.options.length||!packages.some(x=>x.code===packageSelect.value))){
      packageSelect.innerHTML=packages.map(x=>`<option value="${escapeHtml(x.code)}">${escapeHtml(x.label)} · $${Number(x.price).toFixed(2)}</option>`).join('');
      const preferred=packages.find(x=>x.code==='ESSENTIAL')||packages[0];if(preferred)packageSelect.value=preferred.code;
    }
    const pkg=selectedBackgroundPackage();
    if($('background-cost'))$('background-cost').textContent=pkg?`$${Number(pkg.price).toFixed(2)} ${backgroundQuote?.currency||'USD'}${backgroundQuote?.passThroughFeesPossible!==false?' + possible court/database pass-through fees':''}`:'—';
    if($('background-package-detail'))$('background-package-detail').innerHTML=pkg?`<b>${escapeHtml(provider?.name||'Provider')} · ${escapeHtml(pkg.label)}</b><span>${escapeHtml(pkg.detail||'Public package-price reference for prototype demonstration.')}</span>`:'';
    if($('background-provider'))$('background-provider').textContent=`Danco ${provider?.name||'screening-provider'} account`;
  }
  function populateBackgroundQuoteUi(quoteResponse){
    backgroundQuote=quoteResponse||{};
    const fallbackProviders=BACKGROUND_DEMO_FALLBACK.providers.map(name=>({name,packages:BACKGROUND_DEMO_FALLBACK.packages}));
    const providers=Array.isArray(backgroundQuote.providers)&&backgroundQuote.providers.length?backgroundQuote.providers:fallbackProviders;
    const providerSelect=$('background-provider-select');
    providerSelect.innerHTML=providers.map(x=>`<option value="${escapeHtml(x.name)}">${escapeHtml(x.name)} · public price reference</option>`).join('');
    providerSelect.value=providers[0]?.name||'Checkr';
    $('background-package-select').innerHTML='';
    refreshBackgroundPackageUi();
  }
  async function openBackgroundRequest(){
    if(!requireDancoPlus('Integrated background screening'))return;
    if(!currentSharedReference||!currentLoadedRecord)return;
    const application=currentLoadedRecord.application||{};
    const ssnReady=application.ssnStatus==='valid'||application.ssnPrototypeBypass===true||application.ssnStatus==='prototype';
    if(!ssnReady){ $('decode-error').textContent='Unable to request a background check on this applicant due to no Social Security number being provided. Danco does not recognize or accept no Social Security number background checks.'; return; }
    try{
      const quoteResponse=await sharedRequest('/api/background',{action:'quote',reference:currentSharedReference,adminPin:adminAccessPin});
      populateBackgroundQuoteUi(quoteResponse); const identity=quoteResponse.identityReadiness||{};
      $('background-candidate').textContent=`${currentLoadedRecord.name||'Applicant'} · ${currentSharedReference}`;
      if($('background-identity')) $('background-identity').textContent=identity.prototype?'PROTOTYPE bypass · DOB/address readiness recorded':identity.valid?`SSN ending ${identity.ssnLast4||'••••'} · ${identity.dateOfBirthPresent?'DOB on file':'DOB missing'} · ${identity.addressPresent?'Address complete':'Address incomplete'}`:'SSN not ready';
      $('background-demo-result').value='eligible';$('background-approval').checked=false;$('background-approved-by').value='';$('background-error').textContent='';
      openModal('background-modal');
      speak(['Approve background-screening request','Select the package, demonstration outcome and approving administrator, then approve the displayed cost.'],{remember:false});
    }catch(error){$('decode-error').textContent=error.message;}
  }
  async function confirmBackgroundRequest(){
    if(!requireDancoPlus('Integrated background screening'))return;
    $('background-error').textContent='';
    if(!$('background-approval').checked){$('background-error').textContent='Approve the displayed package cost before continuing.';return;}
    const approvedBy=$('background-approved-by').value.trim(); if(!approvedBy){$('background-error').textContent='Enter the approving administrator name.';return;}
    const provider=selectedBackgroundProvider(),pkg=selectedBackgroundPackage(),demoOutcome=$('background-demo-result').value;
    if(!provider||!pkg){$('background-error').textContent='Choose a screening provider reference and package.';return;}
    const button=$('confirm-background-request'); button.disabled=true; button.textContent='Running demonstration…';
    try{
      const response=await sharedRequest('/api/background',{
        action:'request',reference:currentSharedReference,adminPin:adminAccessPin,costApproved:true,approvedBy,
        provider:provider.name,packageCode:pkg.code,packageLabel:pkg.label,quotedCost:pkg.price,demoOutcome
      });
      currentBackgroundScreening=response.screening||null;currentQueueStatus=response.queueStatus||(demoOutcome==='not_eligible'?'background_not_eligible':'background_eligible');closeModal('background-modal');
      toast(demoOutcome==='not_eligible'?'Background check demo failed — candidate filed as not eligible.':'Background check demo passed — candidate filed as eligible.');
      await reloadCurrentSharedRecord(); await populateStoredApplicants(); await populateBackgroundReportFolder();
    }catch(error){$('background-error').textContent=error.message;}
    finally{button.disabled=false;button.textContent='Approve cost & run screening demo';}
  }
  async function setBackgroundDecision(decision){
    if(!requireDancoPlus('Background-screening filing'))return;
    if(!currentSharedReference)return;
    const labels={eligible:'Background checked — Eligible',not_eligible:'Background checked — Not eligible',further_review:'Background checked — To action'};
    if(!confirm(`Move this candidate to “${labels[decision]}”? This is a prototype administrative classification, not an automated employment decision.`))return;
    try{
      await sharedRequest('/api/background',{action:'decision',reference:currentSharedReference,decision,adminPin:adminAccessPin});
      toast(`Candidate moved to ${labels[decision]}.`); await reloadCurrentSharedRecord(); await populateStoredApplicants();
    }catch(error){$('decode-error').textContent=error.message;}
  }
  async function reloadCurrentSharedRecord(){
    if(!currentSharedReference)return;
    const response=await sharedRequest('/api/admin',{action:'get',reference:currentSharedReference,adminPin:adminAccessPin});
    const record=response.submission; if(!record)return;
    currentLoadedRecord=record; currentBackgroundScreening=record.backgroundScreening||null; currentEmploymentContract=record.employmentContract||null;
    const data=record.assessment?.knowledgeAnswers?record.assessment:decodeResult(record.resultCode||record.code);
    renderDashboard(data,{code:'',name:record.name,reference:displayRecordReference(record)||record.reference||record.code,application:record.recordType==='assessment'?null:(record.application||null),submittedAt:record.submittedAt,backgroundScreening:record.backgroundScreening||null,employmentContract:record.employmentContract||null});
    updateReportLeaderboardControl(record); renderBackgroundActions(record); renderEmploymentContractActions(record);
  }



  function renderEmploymentContractActions(record){
    const application=record?.recordType==='assessment'?null:record?.application;
    const panel=$('employment-contract-actions'), signedPanel=$('signed-contract-actions');
    if(!panel||!signedPanel)return;
    panel.hidden=!application||!currentSharedReference;
    signedPanel.hidden=!application||!currentSharedReference;
    if(!application||!currentSharedReference)return;
    const contract=record?.employmentContract||currentEmploymentContract;
    currentEmploymentContract=contract||null;
    if(!dancoPlusActive()){
      panel.classList.add('advanced-locked');signedPanel.classList.add('advanced-locked');
      $('employment-contract-copy').innerHTML='<b>Danco+ feature.</b> Turn a successful candidate record into a consistent pre-filled offer and employment agreement without re-keying application details.';
      $('create-employment-contract').hidden=false;$('create-employment-contract').textContent='Request Danco+ · Create employment agreement';$('view-employment-contract').hidden=true;$('signed-upload-controls').hidden=true;$('open-signed-contract').hidden=true;return;
    }
    panel.classList.remove('advanced-locked');signedPanel.classList.remove('advanced-locked');$('create-employment-contract').textContent='Create employment contract';
    const bg=record?.backgroundScreening||currentBackgroundScreening||null;
    if(contract){
      $('employment-contract-copy').innerHTML=`<b>${escapeHtml(contract.contractReference||'Employment contract')} is stored.</b> ${contract.signedStoragePath?'A signed file has also been uploaded.':'The candidate is now filed under Employment contracts until a signed copy is uploaded.'}`;
    }else if(bg?.decision==='not_eligible'){
      $('employment-contract-copy').innerHTML='<b class="danger-copy">Contract creation is blocked.</b> The background check on this record does not meet Danco criteria. Senior review is required before the candidate can progress.';
    }else if(bg?.decision==='eligible'){
      $('employment-contract-copy').innerHTML='<b>Background-check criteria are recorded as met.</b> Create a pre-filled Danco employment agreement from the stored applicant record.';
    }else if(bg){
      $('employment-contract-copy').innerHTML='<b>A background-screening record is attached.</b> Contract creation requires an administrator to confirm that Danco criteria have been satisfied.';
    }else{
      $('employment-contract-copy').innerHTML='<b>No Danco+ background check is attached.</b> A contract can still be created if an administrator confirms that a satisfactory check was provided through another approved source.';
    }
    $('create-employment-contract').hidden=!!contract;
    $('view-employment-contract').hidden=!contract;
    const signed=!!contract?.signedStoragePath;
    $('signed-upload-controls').hidden=!contract||signed;
    $('open-signed-contract').hidden=!signed;
    $('signed-contract-error').textContent='';
  }
  function contractPrefillSummary(){
    const app=currentLoadedRecord?.application||{};
    const fields=[['Applicant',currentLoadedRecord?.name||'—'],['Application',currentSharedReference||'—'],['Current application role',app.role||'—'],['Email',app.email||'—'],['Phone',app.phone||'—'],['Address',[app.address,app.city,app.state,app.zip].filter(Boolean).join(', ')||'—']];
    $('contract-prefill-summary').innerHTML=fields.map(([label,value])=>`<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join('');
  }
  function resetContractModal(){
    contractEligibilityConfirmed=false;contractEligibilityBasis='';
    $('contract-eligibility-step').hidden=false;$('contract-form-step').hidden=true;$('contract-preview-step').hidden=true;$('contract-blocked').hidden=true;$('contract-error').textContent='';
    const bg=currentBackgroundScreening||currentLoadedRecord?.backgroundScreening||null;
    const buttons=$('contract-eligibility-buttons');
    buttons.hidden=false;
    if(bg?.decision==='not_eligible'){
      $('contract-eligibility-question').textContent='This applicant has a background check on file that does not meet Danco criteria.';
      $('contract-eligibility-context').textContent='The failed screening result blocks contract creation for this candidate in Danco+.';
      $('contract-blocked-copy').textContent='Contract creation cannot proceed because the background check on this record does not meet Danco criteria. Please seek advice from senior staff before progressing the applicant.';
      $('contract-blocked').hidden=false;buttons.hidden=true;
      return;
    }
    if(bg?.decision==='eligible'){
      $('contract-eligibility-question').textContent="Does this applicant's background check meet the required Danco criteria?";
      $('contract-eligibility-context').textContent='A Danco+ background-screening record is on file and is currently marked as meeting criteria.';
      contractEligibilityBasis='Danco+ background screening on file';
    }else if(bg){
      $('contract-eligibility-question').textContent="Has this applicant's background check been reviewed and confirmed as satisfactory?";
      $('contract-eligibility-context').textContent='A Danco+ screening record is attached but still requires an authorized Danco determination before contract creation.';
      contractEligibilityBasis='Danco+ screening reviewed by administrator';
    }else{
      $('contract-eligibility-question').textContent='Has a satisfactory background check been provided through another approved source?';
      $('contract-eligibility-context').textContent='No Danco+ background check is attached to this applicant. Select Yes only if Danco has received and accepted a satisfactory check from another source.';
      contractEligibilityBasis='External / previously supplied background check confirmed by administrator';
    }
    $('contract-blocked-copy').textContent='Contract creation cannot proceed. Please seek advice from senior staff before progressing this applicant.';
  }
  function todayIso(){return new Date().toISOString().slice(0,10);}
  function plusDaysIso(days){const d=new Date();d.setDate(d.getDate()+days);return d.toISOString().slice(0,10);}
  function prefillContractForm(){
    const app=currentLoadedRecord?.application||{};
    $('contract-role').value=['Service Helper','Roofer','Foreman','Commercial Account Manager'].includes(app.role)?app.role:'';
    $('contract-offer-date').value=todayIso();$('contract-offer-expiration').value=plusDaysIso(7);
    $('contract-start-date').value=/^\d{4}-\d{2}-\d{2}$/.test(app.availability||'')?app.availability:'';
    $('contract-work-location').value=[app.city,app.state].filter(Boolean).join(', ');
    $('contract-employment-type').value='Full-time';$('contract-classification').value=app.role==='Commercial Account Manager'?'Salaried / exempt':'Hourly / non-exempt';
    $('contract-pay-frequency').value='Biweekly';$('contract-intro-period').value='90 days';$('contract-created-by').value='';
    $('contract-benefits').value='Per Danco plan terms and eligibility rules';$('contract-pto').value='Per Danco policy';$('contract-overtime').value=app.role==='Commercial Account Manager'?'Per classification and applicable law':'Eligible as required by applicable law';$('contract-travel').value='As required by role and assigned projects/territory';
    $('contract-commission').value=app.role==='Commercial Account Manager'?'Per separate Danco commission / incentive plan':'';
    $('contract-expenses').value='Business expenses reimbursed in accordance with Danco policy';
    $('contract-property').value='Danco-issued property, tools and PPE as required; return on separation';
    $('contract-confidentiality').value='Subject to Danco confidentiality, proprietary-information and information-security policies';
    $('contract-policies').value='Employee handbook, safety policies and role procedures to be acknowledged separately';
    $('contract-payroll').value='Separate secure payroll enrollment required';
    contractPrefillSummary();
  }
  function openContractWorkflow(existing=false){
    if(!requireDancoPlus('Offer & employment agreement builder'))return;
    if(!currentSharedReference||!currentLoadedRecord?.application)return;
    resetContractModal();
    if(existing&&currentEmploymentContract){$('contract-eligibility-step').hidden=true;$('contract-preview-step').hidden=false;renderContractPreview(currentEmploymentContract);}
    openModal('contract-modal');
    if(!existing)speak(['Create employment contract',$('contract-eligibility-question').textContent],{remember:false});
  }
  function collectContractData(){
    return {
      offerDate:$('contract-offer-date').value,
      offerExpiration:$('contract-offer-expiration').value,
      employmentType:$('contract-employment-type').value,
      classification:$('contract-classification').value,
      startDate:$('contract-start-date').value,
      compensation:$('contract-compensation').value.trim(),
      payFrequency:$('contract-pay-frequency').value,
      commissionPlan:$('contract-commission').value.trim(),
      workLocation:$('contract-work-location').value.trim(),
      supervisor:$('contract-supervisor').value.trim(),
      schedule:$('contract-schedule').value.trim(),
      introductoryPeriod:$('contract-intro-period').value,
      benefits:$('contract-benefits').value.trim(),
      pto:$('contract-pto').value.trim(),
      overtime:$('contract-overtime').value.trim(),
      travel:$('contract-travel').value.trim(),
      expenses:$('contract-expenses').value.trim(),
      companyProperty:$('contract-property').value.trim(),
      confidentiality:$('contract-confidentiality').value.trim(),
      policyAcknowledgment:$('contract-policies').value.trim(),
      payrollOnboarding:$('contract-payroll').value,
      backgroundCheckBasis:contractEligibilityBasis||'Administrator confirmed satisfactory background-check criteria',
      additionalTerms:$('contract-additional-terms').value.trim(),
      preparedBy:$('contract-created-by').value.trim()
    };
  }
  function contractValue(value,fallback='To be completed'){return escapeHtml(value||fallback);}
  function renderContractPreview(contract){
    const app=currentLoadedRecord?.application||{};const d=contract?.contractData||{};
    const address=[app.address,app.city,app.state,app.zip].filter(Boolean).join(', ');
    const salesRole=contract?.offeredRole==='Commercial Account Manager';
    $('contract-preview').innerHTML=`
      <article class="contract-document">
        <header class="contract-document-header"><img src="danco-logo-white.png" alt="Danco Roofing Services, Inc."><div><h2>Employment Agreement / Offer Terms</h2><small>${escapeHtml(contract?.contractReference||'Prototype contract')}</small></div></header>
        <div class="contract-document-body">
          <div class="contract-document-meta"><div><span>Employee</span><b>${contractValue(currentLoadedRecord?.name,'Applicant')}</b></div><div><span>Role offered</span><b>${contractValue(contract?.offeredRole)}</b></div><div><span>Offer date</span><b>${contractValue(d.offerDate)}</b></div><div><span>Proposed start date</span><b>${contractValue(d.startDate)}</b></div></div>
          <section class="contract-section"><h3>Employee particulars</h3><div class="contract-grid"><div><span>Email</span><b>${contractValue(app.email)}</b></div><div><span>Phone</span><b>${contractValue(app.phone)}</b></div><div><span>Home address</span><b>${contractValue(address)}</b></div><div><span>U.S. work authorization</span><b>${contractValue(app.authorization)}</b></div><div><span>Background-check basis</span><b>${contractValue(d.backgroundCheckBasis)}</b></div><div><span>Offer valid through</span><b>${contractValue(d.offerExpiration)}</b></div></div></section>
          <section class="contract-section"><h3>Position and compensation</h3><div class="contract-grid"><div><span>Employment type</span><b>${contractValue(d.employmentType)}</b></div><div><span>FLSA classification</span><b>${contractValue(d.classification)}</b></div><div><span>Compensation</span><b>${contractValue(d.compensation)}</b></div><div><span>Pay frequency</span><b>${contractValue(d.payFrequency)}</b></div>${salesRole||d.commissionPlan?`<div><span>Commission / incentive plan</span><b>${contractValue(d.commissionPlan,'Separate plan / to be confirmed')}</b></div>`:''}<div><span>Primary work location</span><b>${contractValue(d.workLocation)}</b></div><div><span>Reports to</span><b>${contractValue(d.supervisor)}</b></div><div><span>Normal schedule</span><b>${contractValue(d.schedule)}</b></div><div><span>Introductory period</span><b>${contractValue(d.introductoryPeriod)}</b></div></div></section>
          <section class="contract-section"><h3>Benefits and working conditions</h3><div class="contract-grid"><div><span>Benefits eligibility</span><b>${contractValue(d.benefits)}</b></div><div><span>PTO / leave</span><b>${contractValue(d.pto)}</b></div><div><span>Overtime</span><b>${contractValue(d.overtime)}</b></div><div><span>Travel / vehicle</span><b>${contractValue(d.travel)}</b></div><div><span>Expense reimbursement</span><b>${contractValue(d.expenses)}</b></div><div><span>Company property / PPE</span><b>${contractValue(d.companyProperty)}</b></div></div></section>
          <section class="contract-section"><h3>Policies, confidentiality and onboarding</h3><div class="contract-grid"><div><span>Confidentiality / proprietary information</span><b>${contractValue(d.confidentiality)}</b></div><div><span>Handbook / policy acknowledgment</span><b>${contractValue(d.policyAcknowledgment)}</b></div><div><span>Payroll / direct deposit</span><b>${contractValue(d.payrollOnboarding)}</b></div><div><span>Prepared by</span><b>${contractValue(d.preparedBy,'Danco administrator')}</b></div></div><p class="contract-security-note"><b>Payroll security:</b> Bank account and routing numbers are intentionally not included in this agreement. Collect them separately through Danco's approved secure payroll process.</p></section>
          <section class="contract-section"><h3>Employment terms</h3><div class="contract-terms"><p>Employment is intended to be at-will to the extent permitted by applicable law. Either Danco or the employee may end the employment relationship at any time, with or without advance notice or cause, subject to applicable law and any final Danco-approved agreement.</p><p>The employee is expected to perform the duties of the offered role, follow lawful management direction, maintain attendance and performance standards, and comply with Danco safety requirements, workplace policies, project/site rules, confidentiality obligations and controls for company property, tools, vehicles and information.</p><p>Compensation, benefits, leave, incentive arrangements and expense reimbursement remain subject to the applicable Danco plan documents and policies. Required work-authorization/I-9, onboarding documentation and any approved background-screening requirements must be satisfied before or during onboarding as directed by Danco.</p><p>Confidential, proprietary, customer and company information must be protected in accordance with Danco policy. Company property must be returned when requested or when employment ends. This prototype is intended for an Indiana-based employer and remains subject to applicable federal, state and local law.</p>${d.additionalTerms?`<p><b>Additional offer terms:</b> ${escapeHtml(d.additionalTerms)}</p>`:''}<p class="fine">Prototype document generated from the Danco recruitment workflow. Final production wording, classifications and policy references should be approved by Danco HR and qualified employment counsel before use as a binding agreement.</p></div></section>
          <div class="signature-grid"><div class="signature-line">Employee signature / date</div><div class="signature-line">For Danco Roofing Services, Inc. / date</div></div>
        </div><footer class="contract-document-footer"><span>Danco Roofing Services, Inc. · Employment Agreement Prototype</span><span>Generated by Danco Workforce Assessment · JW EDS</span></footer>
      </article>`;
  }
  async function createEmploymentContract(){
    if(!requireDancoPlus('Offer & employment agreement builder'))return;
    $('contract-error').textContent='';
    const appRole=currentLoadedRecord?.application?.role||'';
    const role=$('contract-role').value||appRole;if(!['Service Helper','Roofer','Foreman','Commercial Account Manager'].includes(role)){$('contract-error').textContent='Choose the role being offered.';return;}
    const data=collectContractData();
    const createdBy=data.preparedBy||'Danco administrator (prototype)';
    const button=$('confirm-create-contract');button.disabled=true;button.textContent='Creating contract…';
    try{
      const response=await sharedRequest('/api/contracts',{action:'create',reference:currentSharedReference,adminPin:adminAccessPin,backgroundCriteriaMet:true,backgroundCheckBasis:data.backgroundCheckBasis,offeredRole:role,createdBy,contractData:data});
      currentEmploymentContract=response.contract||null;if(!currentEmploymentContract)throw new Error('The contract could not be created.');
      $('contract-form-step').hidden=true;$('contract-preview-step').hidden=false;renderContractPreview(currentEmploymentContract);currentQueueStatus='employment_contracts';toast('Employment agreement created and filed.');await reloadCurrentSharedRecord();await populateStoredApplicants();
    }catch(error){$('contract-error').textContent=error.message;}
    finally{button.disabled=false;button.textContent='Create pre-filled contract';}
  }
  function fileToBase64(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||'').split(',')[1]||'');reader.onerror=()=>reject(new Error('The selected file could not be read.'));reader.readAsDataURL(file);});}
  async function uploadSignedContract(){
    if(!requireDancoPlus('Secure employment file progression'))return;
    const file=$('signed-contract-file').files?.[0],uploadedBy=$('signed-contract-uploaded-by').value.trim();$('signed-contract-error').textContent='';
    if(!currentEmploymentContract){$('signed-contract-error').textContent='Create the employment contract before uploading a signed copy.';return;}
    if(!file){$('signed-contract-error').textContent='Choose the signed PDF or scanned image first.';return;}
    if(!['application/pdf','image/jpeg','image/png'].includes(file.type)){ $('signed-contract-error').textContent='Use a PDF, JPEG or PNG file.';return; }
    if(file.size>8*1024*1024){$('signed-contract-error').textContent='Prototype upload limit: 8 MB.';return;}
    if(!uploadedBy){$('signed-contract-error').textContent='Enter the administrator name for the upload audit trail.';return;}
    const button=$('upload-signed-contract');button.disabled=true;button.textContent='Uploading…';
    try{const base64=await fileToBase64(file);const response=await sharedRequest('/api/contracts',{action:'upload_signed',reference:currentSharedReference,adminPin:adminAccessPin,fileName:file.name,mimeType:file.type,fileBase64:base64,uploadedBy});currentEmploymentContract=response.contract||currentEmploymentContract;currentQueueStatus='signed_employment_contracts';toast('Signed employment contract uploaded and filed.');$('signed-contract-file').value='';await reloadCurrentSharedRecord();await populateStoredApplicants();}
    catch(error){$('signed-contract-error').textContent=error.message;}
    finally{button.disabled=false;button.textContent='Upload signed contract';}
  }
  async function openSignedContract(){
    if(!requireDancoPlus('Secure employment file progression'))return;
    if(!currentSharedReference)return;try{const response=await sharedRequest('/api/contracts',{action:'signed_url',reference:currentSharedReference,adminPin:adminAccessPin});if(!response.url)throw new Error('No signed contract file is available.');window.open(response.url,'_blank','noopener');}catch(error){$('signed-contract-error').textContent=error.message;}
  }
  function printEmploymentContract(){
    document.body.classList.add('print-contract-mode');const clean=()=>document.body.classList.remove('print-contract-mode');window.addEventListener('afterprint',clean,{once:true});window.print();setTimeout(clean,1500);
  }

  function initEvents(){
    $$('[data-language]').forEach(button=>button.addEventListener('click',()=>{setLanguage(button.dataset.language);routeAfterLanguage();}));
    $('invite-welcome-continue')?.addEventListener('click',()=>showScreen('language-screen'));
    $$('[data-action="open-danco-plus-pitch"]').forEach(button=>button.addEventListener('click',()=>openDancoPitch()));
    $('play-danco-plus-pitch')?.addEventListener('click',startDancoPitch);
    $('skip-danco-plus-pitch')?.addEventListener('click',skipDancoPitchPrompt);
    $('close-danco-plus-pitch')?.addEventListener('click',closeDancoPitch);
    $('pitch-play-pause')?.addEventListener('click',pauseResumeDancoPitch);
    $('pitch-prev')?.addEventListener('click',()=>advanceDancoPitch(-1));
    $('pitch-next')?.addEventListener('click',()=>advanceDancoPitch(1));
    $('pitch-sound')?.addEventListener('click',togglePitchSound);
    $('pitch-replay')?.addEventListener('click',startDancoPitch);
    $('pitch-primary-cta')?.addEventListener('click',pitchPrimaryAction);
    $$('[data-action="open-unlock"]').forEach(button=>button.addEventListener('click',()=>openModal('unlock-modal')));
    $$('[data-action="close-unlock"]').forEach(button=>button.addEventListener('click',()=>closeModal('unlock-modal')));
    $$('[data-action="close-admin"]').forEach(button=>button.addEventListener('click',()=>closeModal('admin-modal')));
    $$('[data-action="close-submit"]').forEach(button=>button.addEventListener('click',()=>closeModal('submit-modal')));
    $$('[data-action="close-help"]').forEach(button=>button.addEventListener('click',closeHelp));
    document.querySelector('[data-action="repeat-audio"]').addEventListener('click',repeatHelpAudio);
    document.querySelector('[data-action="test-narration"]').addEventListener('click',testNarration);
    $$('[data-voice-mode]').forEach(button=>button.addEventListener('click',()=>setVoiceMode(button.dataset.voiceMode)));
    document.querySelector('.brand-button').addEventListener('click',()=>{if(session?.status==='complete')renderResult();else if(inviteLiveMode()){prepareInviteWelcome();showScreen('invite-welcome-screen');}else showScreen('language-screen');});
    $('help-tab').addEventListener('click',openHelp); $('help-backdrop').addEventListener('click',closeHelp);
    $('language-toggle').addEventListener('click',()=>setLanguage(settings.lang==='en'?'es':'en'));
    $('audio-toggle').addEventListener('click',()=>setAudioSupport(!settings.audio));
    $('fullscreen-toggle').addEventListener('click',()=>toggleAppFullscreen());
    $('immersive-exit').addEventListener('click',()=>toggleAppFullscreen(true));
    document.addEventListener('fullscreenchange',()=>{if(nativeFullscreenActive&&!document.fullscreenElement){nativeFullscreenActive=false;document.body.classList.remove('immersive-mode');}});
    document.addEventListener('webkitfullscreenchange',()=>{if(nativeFullscreenActive&&!document.webkitFullscreenElement){nativeFullscreenActive=false;document.body.classList.remove('immersive-mode');}});
    $$('.setup-choice').forEach(button=>button.addEventListener('click',()=>setAudioSupport(button.dataset.audio==='on',{askReason:button.dataset.audio==='on'})));
    $$('[data-support-reason]').forEach(button=>button.addEventListener('click',()=>selectAudioSupportReason(button.dataset.supportReason)));
    $$('input[name="background-consent"]').forEach(input=>input.addEventListener('change',updateBackgroundConsentReason));
    $('candidate-role')?.addEventListener('change',updateRoleExperienceLabel);
    $('candidate-ssn')?.addEventListener('input',()=>{const input=$('candidate-ssn');const formatted=formatSsnInput(input.value);if(input.value!==formatted)input.value=formatted;resetSsnOverrideIfChanged();updateSsnStatus();});
    $('begin-beginner').addEventListener('click',beginBeginner); $('start-profile').addEventListener('click',startProfile); $('skip-profile').addEventListener('click',skipProfile); $('profile-confirm').addEventListener('click',confirmProfileAnswer); $('start-knowledge').addEventListener('click',startKnowledge); $('knowledge-repeat').addEventListener('click',repeatCurrentQuestion); $('knowledge-reveal')?.addEventListener('click',revealAccessibleAnswers); $('knowledge-confirm').addEventListener('click',confirmKnowledgeAnswer); $('accessible-answer-no')?.addEventListener('click',()=>accessibleCommitDecision(false)); $('accessible-answer-yes')?.addEventListener('click',()=>accessibleCommitDecision(true));
    $('unlock-submit').addEventListener('click',async()=>{ $('unlock-error').textContent=''; const raw=$('unlock-code').value; try{const result=activateCode(raw);if(result.mode==='owner'){try{await establishOwnerSession(raw);}catch(_){}toast(t('ownerSuccess'));applyDancoPlusMode();}else{if(result.remaining<=0)throw new Error(t('usedError'));toast(t('unlockSuccess',result.remaining));} $('unlock-code').value='';closeModal('unlock-modal');}catch(error){$('unlock-error').textContent=error.message;} });
    $('copy-code').addEventListener('click',async()=>{try{const value=session.mode==='application'?(session.submissionReference||''):session.resultCode;if(!value)return;await navigator.clipboard.writeText(value);toast(t('copied'));}catch(_){toast(t('copyFailed'));}});
    $('submit-application').addEventListener('click',()=>{$('submit-error').textContent='';openModal('submit-modal');});
    $('confirm-submit').addEventListener('click',storeCurrentApplication);
    $('next-applicant').addEventListener('click',()=>{if(!isOwner()&&trialRemaining()<=0){openModal('unlock-modal');return;}localStorage.removeItem(SESSION_KEY);session=null;newSession();showScreen('language-screen');});
    $('danco-plus-header-status')?.addEventListener('click',toggleHeaderDancoPlus);
    $('admin-open').addEventListener('click',()=>{openModal('admin-modal');$('admin-login').hidden=adminAuthenticated;$('admin-dashboard').hidden=!adminAuthenticated;if(!adminAuthenticated)setTimeout(()=>$('admin-pin').focus(),80);else prepareAdmin();});
    $('admin-login-button').addEventListener('click',()=>{const pin=$('admin-pin').value.trim();if(accessHash(pin)!==ADMIN_HASH){$('admin-error').textContent='Administrator PIN not recognized.';return;}adminAuthenticated=true;adminAccessPin=pin;$('admin-error').textContent='';$('admin-pin').value='';$('admin-login').hidden=true;$('admin-dashboard').hidden=false;prepareAdmin();});
    $$('[data-admin-device-mode]').forEach(button=>button.addEventListener('click',()=>setDeviceMode(button.dataset.adminDeviceMode)));
    $$('[data-journey-mode]').forEach(button=>button.addEventListener('click',()=>chooseJourney(button.dataset.journeyMode)));
    $$('[data-action="close-ssn-warning"]').forEach(button=>button.addEventListener('click',()=>closeModal('ssn-warning-modal')));
    $('ssn-go-back')?.addEventListener('click',()=>closeModal('ssn-warning-modal'));
    $('ssn-proceed-without')?.addEventListener('click',()=>{$('ssn-warning-choice-actions').hidden=true;$('ssn-reason-panel').hidden=false;});
    $('ssn-missing-reason')?.addEventListener('change',updateSsnOtherReason);
    $('ssn-confirm-proceed')?.addEventListener('click',confirmSsnOverride);
    $$('[data-queue-status]').forEach(button=>button.addEventListener('click',()=>{const target=button.dataset.queueStatus;if(advancedQueueStatus(target)&&!requireDancoPlus('Advanced candidate filing'))return;currentQueueStatus=target;currentSharedReference='';currentLoadedRecord=null;currentBackgroundScreening=null;currentEmploymentContract=null;$('submission-status-actions').hidden=true;$('background-screening-actions').hidden=true;$('employment-contract-actions').hidden=true;$('signed-contract-actions').hidden=true;$('dashboard-output').innerHTML='';populateStoredApplicants();}));
    $$('[data-set-submission-status]').forEach(button=>button.addEventListener('click',()=>updateSharedStatus(button.dataset.setSubmissionStatus)));
    $('load-stored-applicant').addEventListener('click',loadStoredApplicant);
    $('request-background-check').addEventListener('click',openBackgroundRequest);
    $('create-employment-contract').addEventListener('click',()=>openContractWorkflow(false));
    $('view-employment-contract').addEventListener('click',()=>openContractWorkflow(true));
    $('contract-eligibility-no').addEventListener('click',()=>{$('contract-blocked').hidden=false;$('contract-form-step').hidden=true;});
    $('contract-eligibility-yes').addEventListener('click',()=>{contractEligibilityConfirmed=true;$('contract-eligibility-step').hidden=true;$('contract-form-step').hidden=false;prefillContractForm();});
    $('background-provider-select').addEventListener('change',()=>{$('background-package-select').innerHTML='';refreshBackgroundPackageUi();});
    $('background-package-select').addEventListener('change',refreshBackgroundPackageUi);
    $('confirm-create-contract').addEventListener('click',createEmploymentContract);
    $('upload-signed-contract').addEventListener('click',uploadSignedContract);
    $('open-signed-contract').addEventListener('click',openSignedContract);
    $('open-background-report')?.addEventListener('click',openBackgroundReportFile);
    $$('[data-action="close-background-report-viewer"]').forEach(button=>button.addEventListener('click',()=>closeModal('background-report-viewer-modal')));
    $('print-background-report')?.addEventListener('click',printBackgroundReport);
    $('print-contract').addEventListener('click',printEmploymentContract);
    $('confirm-background-request').addEventListener('click',confirmBackgroundRequest);
    $$('[data-background-decision]').forEach(button=>button.addEventListener('click',()=>setBackgroundDecision(button.dataset.backgroundDecision)));
    $$('[data-action="close-background"]').forEach(button=>button.addEventListener('click',()=>closeModal('background-modal')));
    $$('[data-action="close-contract"]').forEach(button=>button.addEventListener('click',()=>closeModal('contract-modal')));
    $('request-danco-plus')?.addEventListener('click',()=>openDancoPlusRequest('Danco+ advanced hiring workflow'));
    $('submit-danco-plus-request')?.addEventListener('click',submitDancoPlusRequest);
    $$('[data-action="close-danco-plus-request"]').forEach(button=>button.addEventListener('click',()=>closeModal('danco-plus-request-modal')));
    $('enter-danco-plus')?.addEventListener('click',()=>{localStorage.setItem(DANCO_PLUS_INTRO_KEY,'1');closeModal('danco-plus-welcome-modal');toast('Danco+ advanced mode active.');});
    $$('[data-owner-product-mode]').forEach(button=>button.addEventListener('click',()=>setOwnerProductMode(button.dataset.ownerProductMode)));
    $('refresh-danco-plus-requests')?.addEventListener('click',refreshOwnerRequests);
    $('create-candidate-link')?.addEventListener('click',createCandidateInvite);
    $('copy-candidate-link')?.addEventListener('click',copyCandidateInvite);
    $('verify-owner-session')?.addEventListener('click',()=>{if($('owner-verify-error'))$('owner-verify-error').textContent='';openModal('owner-verify-modal');setTimeout(()=>$('owner-verify-code')?.focus(),80);});
    $$('[data-action="close-owner-verify"]').forEach(button=>button.addEventListener('click',()=>closeModal('owner-verify-modal')));
    $('owner-verify-submit')?.addEventListener('click',async()=>{const code=$('owner-verify-code').value,error=$('owner-verify-error'),button=$('owner-verify-submit');error.textContent='';button.disabled=true;button.textContent='Verifying…';try{if(accessHash(code)!==OWNER_HASH)throw new Error('Owner access code not recognized.');localStorage.setItem(OWNER_KEY,'1');await establishOwnerSession(code);applyAccessState();$('owner-verify-code').value='';closeModal('owner-verify-modal');toast('Owner access active.');if(adminAuthenticated)await refreshOwnerRequests();}catch(e){error.textContent=e.message;}finally{button.disabled=false;button.textContent='Verify owner';}});
    $('report-leaderboard-toggle')?.addEventListener('click',()=>{const section=$('report-leaderboard-control'),ref=section?.dataset.reference||'',action=$('report-leaderboard-toggle').dataset.leaderboardAction||'hide';if(ref)setLeaderboardVisibility(ref,action==='hide');});
    $('load-example').addEventListener('click',()=>{const demo={knowledgeAnswers:[1,1,1,1,1,1,2,1,1,1],profileSkipped:false,profileAnswers:['S','C','S','I','S'],assessmentTrack:'roofing',lang:'en',audio:false};currentLoadedRecord=null;renderBackgroundActions(null);renderDashboard(demo,{demo:true,name:'Example Applicant',reference:'DEMO-001'});});
    $('print-report').addEventListener('click',()=>window.print());
    $('reset-device').addEventListener('click',()=>{if(!confirm('Reset the current applicant on this device? Access status and remaining trial runs will be preserved.'))return;clearInterval(timer);localStorage.removeItem(SESSION_KEY);session=null;$('dashboard-output').innerHTML='';closeModal('admin-modal');newSession();showScreen('language-screen');toast('Applicant reset.');});
    [$('unlock-modal'),$('admin-modal'),$('submit-modal'),$('background-modal'),$('background-report-viewer-modal'),$('accessible-answer-confirm-modal'),$('contract-modal'),$('ssn-warning-modal'),$('danco-plus-request-modal'),$('danco-plus-welcome-modal'),$('owner-verify-modal')].forEach(modal=>modal.addEventListener('click',event=>{if(event.target===modal)modal.classList.remove('open');}));
    $('danco-plus-pitch-prompt-modal')?.addEventListener('click',event=>{if(event.target===$('danco-plus-pitch-prompt-modal'))skipDancoPitchPrompt();});
    $('danco-plus-pitch-modal')?.addEventListener('click',event=>{if(event.target===$('danco-plus-pitch-modal'))closeDancoPitch();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeModal('unlock-modal');closeModal('admin-modal');closeModal('submit-modal');closeModal('background-modal');closeModal('background-report-viewer-modal');closeModal('accessible-answer-confirm-modal');closeModal('contract-modal');closeModal('ssn-warning-modal');closeModal('danco-plus-request-modal');closeModal('danco-plus-welcome-modal');closeModal('danco-plus-pitch-prompt-modal');closeDancoPitch();closeModal('owner-verify-modal');closeHelp();}});
  }
  function prepareAdmin(){
    $('print-date').textContent=new Intl.DateTimeFormat('en-US',{dateStyle:'long',timeStyle:'short'}).format(new Date());
    renderSalesLeaderboard();
    populateStoredApplicants(); applyProductMode(); applyDancoPlusMode(); refreshDancoPlusStatus({welcome:true}); if(isOwner())refreshOwnerRequests();
    if(session?.status==='complete'){
      try{const decoded=decodeResult(session.resultCode);decoded.assessmentTrack=session.assessmentTrack||'roofing';renderDashboard(decoded,{code:'',name:session.name,reference:session.submissionReference||session.reference,application:session.mode==='application'?(session.application||{}):null,submittedAt:session.submittedAt||''});}catch(_){}
    }
  }

  async function init(){
    settings.deviceMode=normaliseDeviceMode(settings.deviceMode); if(session&&session.status!=='complete'&&!['assessment','application',''].includes(session.mode)){session.mode='';saveSession();}
    initialiseNarration();setLanguage(settings.lang);$('audio-toggle').textContent=settings.audio?'🔊':'🔇';initEvents();
    const invited=await handleInviteBoot();
    applyAccessState();applyProductMode();applyDancoPlusMode();
    if(!invited)refreshDancoPlusStatus({welcome:true});
    if(invited){
      prepareInviteWelcome();
      if(session?.status==='complete'&&session.resultCode){settings.lang=session.lang||settings.lang;setLanguage(settings.lang);applyProductMode();renderResult();}
      else if(activeInvite?.status==='started'&&session?.status==='knowledge'&&!activeInvite.blockedStarted){settings.lang=session.lang||settings.lang;setLanguage(settings.lang);applyProductMode();renderKnowledgeQuestion();}
      else showScreen('invite-welcome-screen');
    }else if(session?.status==='complete'&&session.resultCode){settings.lang=session.lang||settings.lang;setLanguage(settings.lang);renderResult();}
    else if(session?.status==='knowledge'){settings.lang=session.lang||settings.lang;setLanguage(settings.lang);showInstructions();$('start-knowledge').textContent=t('resume');}
    else if(session?.status==='profile'){settings.lang=session.lang||settings.lang;setLanguage(settings.lang);profileIndex=session.profileAnswers?.length||0;renderProfile();}
    else if(session?.status==='profile-intro'){settings.lang=session.lang||settings.lang;setLanguage(settings.lang);showScreen('profile-intro-screen');}
    else showScreen('language-screen');
    if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js?v=36.0.0').catch(()=>{}));
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!inviteLiveMode())refreshDancoPlusStatus({welcome:true});});
  }

  document.addEventListener('DOMContentLoaded',()=>{init().catch(error=>{console.error(error);showScreen(INVITE_TOKEN?'invite-welcome-screen':'language-screen');});});
})();
