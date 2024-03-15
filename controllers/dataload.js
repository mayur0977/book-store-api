const { MongoClient } = require('mongodb');

// Connection URI for your MongoDB cluster
const uri =
  'mongodb+srv://mayur0977:DGu0NPTV6mgilKmR@bookstorecluster.ibv7ggp.mongodb.net/booksdb?retryWrites=true&w=majority';

// Sample data to insert
const documentsToInsert = [
  {
    title: 'Paraxial Light Beams with Angular Momentum',
    description:
      'Fundamental and applied concepts concerning the ability of light beams to carry a certain mechanical angular momentum (AM) with respect to the propagation axis are reviewed and discussed in this book. In paraxial beams, the total beam AM can be represented as a sum of the spin (SAM) and orbital (OAM) angular momentums. SAM is an attribute of beams with elliptic (circular) polarisation and is related to the spin of photons. OAM is conditioned by the macroscopic transverse energy circulation and does not depend on the beam polarisation state. In turn, the OAM can be divided in two components which reflect different forms of this energy circulation. Important class of beams with OAM, are vortex beams with helical geometric structure. They constitute a full set of azimuthal harmonics characterised by integer index l each possessing AM l per photon. Arbitrary paraxial beam can be represented as a superposition of helical beams with different l. Models of helical beams and methods of their practical generation are discussed. Transverse energy flows in light beams can be described on the basis of a mechanical model assimilating them to fluid bodies; remarkably, in a helical beam the transverse flow distribution exactly corresponds to the laws of the vortex behaviour in other fields of physics (fluid dynamics, electricity). Experiments on transmission of the beam AM to other bodies (optical elements and to suspended microparticles) are discussed. Research prospects and ways of practical utilisation of optical beams with AM are discussed.',
    categories: ['Angular momentum (Nuclear physics)'],
    authors: ['A. Bekshaev', 'Marat Samuilovich Soskin', 'M. Vasnetsov'],
    publishedDate: '2008',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=D9VEIQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=D9VEIQAACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=2&source=gbs_api',
  },
  {
    title: 'India - a Federal Union of States',
    subTitle: 'Fault Lines, Challenges and Opportunities',
    description:
      'IN THE LAST 70 YEARS SINCE THE ADOPTION OF THE CONSTITUTION, India has transitioned into a multi-party democracy with a greatly polarised polity. It is time to take a closer look at how successful India has been in working its unique model of a Federal Union of States. Born amid the Partition, the emphasis in the Constitution on a strong Centre was understandable. But, that is no longer enough. Some fault lines are now evident. Nonseparation of religion from politics, irritants in Centre-state relations, the institution of state Governor, division of legislative powers between the Union and the states, the official language dilemma, and the rising tide of sub-nationalism are clamouring for attention. India has single citizenship, but increasing state domiciliary restrictions are legalizing discrimination and undermining fundamental rights, more particularly, equality of opportunity in public employment.',
    categories: ['Constitutional law'],
    authors: ['Dr Godbole', 'Madhav Godbole'],
    publishedDate: '2021',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=N4DLzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=N4DLzgEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=3&source=gbs_api',
  },
  {
    title: 'I Will Fear No Evil',
    description:
      "The brilliantly shocking story of the ultimate transplant from New York Times bestselling author Robert A. Heinlein. As startling and provocative as his famous Stranger in a Strange Land, here is Heinlein's awesome masterpiece about a man supremely talented, immensely old and obscenely wealthy who discovers that money can buy everything. Even a new life in the body of a beautiful young woman. Once again, master storyteller Robert A. Heinlein delievers a wild and intriguing classic of science fiction.",
    categories: ['Fiction'],
    authors: ['Robert A. Heinlein'],
    publisher: 'Penguin',
    publishedDate: '1987-04-15',
    language: 'en',
    pageCount: 513,
    thumbnail:
      'http://books.google.com/books/content?id=0ZJQSnRzcCYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=0ZJQSnRzcCYC&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=4&source=gbs_api',
  },
  {
    title: 'Good Trouble',
    subTitle: "Building a Successful Life and Business with Asperger's",
    description:
      'In 1996, everything about Joe Biel’s life seemed like a mistake. He was 18, he lived in Cleveland, he got drunk every day, and he had mystery health problems and weird social tics. All his friends’ lives were as bad or worse. To escape a nihilistic, apocalyptic worldview and to bring reading and documentation into a communal punk scene, he started assembling zines and bringing them in milk crates to underground punk shows. Eventually this became Microcosm Publishing. But Biel’s head for math was stronger than his ability to relate to people, and it wasn’t until he was diagnosed with Asperger’s Syndrome that it all began to fall into place. This is the story of how, over 20 years, one person turned a litany of continuing mistakes and seeming wrong turns into a happy, fulfilled life and a thriving publishing business that defies all odds.',
    categories: ['Psychology'],
    authors: ['Joe Biel'],
    publisher: 'Microcosm Publishing',
    publishedDate: '2016-03-15',
    language: 'en',
    pageCount: 246,
    thumbnail:
      'http://books.google.com/books/content?id=lXxjCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=lXxjCwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=5&source=gbs_api',
  },
  {
    title: "People's Guide to Publishing",
    subTitle:
      'Building a Successful, Sustainable, Meaningful Book Business From the Ground Up',
    description:
      "So, you want to publish books.Drawing on 23 years of experience operating an independent publishing company, Joe Biel has written the most accessible and comprehensive guide to running a successful publishing business. You'll learn all the skills of the trade, including how to:Develop your individual books to connect with readers on a practical and emotional levelChoose between offset printed, digitally printed, and eBook formats and work effectively with printersBuild an authentic niche so you can reach your audience and sell books directlyUnderstand if and when you're ready to work with a distributor or large online retailerCreate a budget and predict the cost and income of each book so your company stays in the blackDecide what work you need to do yourself and what can be done by othersPlan for sustainable growthFeaturing interviews with other upstart independent publishers and funny anecdotes from publishing's long history as well as detailed charts and visuals, this book is intended both beginners looking for a realistic overview of the publishing or self-publishing process and for experienced publishers seeking a deeper understanding of accounting principles, ways to bring their books to new audiences, and how to advance their mission in a changing industry. All readers will come away with the confidence to move forward wisely and a strong sense of why publishing matters today more than ever.",
    categories: ['Language Arts & Disciplines'],
    authors: ['Joe Biel'],
    publisher: 'Microcosm Publishing',
    publishedDate: '2018-12-05',
    language: 'en',
    pageCount: 322,
    thumbnail:
      'http://books.google.com/books/content?id=MxrtDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=MxrtDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=7&source=gbs_api',
  },
  {
    title: 'BIQUADRATIC DIOPHANTINE EQUATIONS WITH INTEGER SOLUTIONS',
    subTitle: 'BIQUADRATIC DIOPHANTINE EQUATIONS',
    description:
      'The theory of Diophantine equation is an ancient subject that typically involves solving polynomial equations in integers. It is well known that a Diophantine equation is an equation with integer coefficient and multiple variables ( 2) having integer solutions. There is no universal method available to know whether a Diophantine equation has a solutions or finding all solutions, if it exists. Proving that even simple Diophantine equations have no solutions may require very sophisticated methods and in such cases, a lot of deep and beautiful mathematics get generated as a result. It is worth to observe that Diophatine equations are rich in variety. A collection of special Problems on biquadratic equations in 3,4,5 & 6 variables has been treated in sections A to D respectively. Different sets of integer solutions to each of the biquadratic diophatine equations are illustrated.',
    categories: ['Mathematics'],
    authors: [
      'Prof. Dr. M.A. Gopalan',
      'J.Shanthi',
      'D. Maheswari',
      'T. Geetha',
    ],
    publisher: 'KY Publications',
    publishedDate: '2018-07-01',
    language: 'en',
    pageCount: 83,
    thumbnail:
      'http://books.google.com/books/content?id=AOxiDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=AOxiDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=8&source=gbs_api',
  },
  {
    title: 'A Poisoned Passion',
    subTitle:
      'A Young Mother, her War Hero Husband, and the Marriage that Ended in Murder',
    description:
      "By the age of twenty-four, Air Force Staff Sergeant Mike Severance had already survived a series of missions in Afghanistan and Iraq. But his life back at home, in Texas, would prove a lot more dangerous... In the winter of 2005, Mike's wife, a veterinarian named Wendi Mae Davidson, reported him missing. Wendi told police that Mike had been acting erratically-visiting local clubs, staying out late, sometimes not coming home at all. She filed for divorce the very next day. Eventually Mike's body turned up in a stock pond on a private ranch. Investigators described a corpse that was weighted down with two cinder blocks, a rock, a boat anchor, and other equipment. It had also been stabbed forty-one times with a knife. But an autopsy report told a different story: That the cause of death was exposure to pentobarbital and phenobarbital, drugs commonly used in veterinary medicine. All the evidence pointed to Wendi...and soon she would be found guilty of murder in the first degree. Diane Fanning's A Poisioned Passion is the true, shocking story of a war hero and a marriage that ended in cold-blooded murder.",
    categories: ['True Crime'],
    authors: ['Diane Fanning'],
    publisher: "St. Martin's True Crime",
    publishedDate: '2009-09-01',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=QYVpmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=QYVpmAEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=9&source=gbs_api',
  },
  {
    title:
      'ANALYSIS OF PATIENT SAFETY MEASURES IN THE PRIVATE SECONDARY CARE HOSPITALS OF NANDED CITY',
    subTitle: 'PATIENT SAFETY MEASURES',
    description:
      'ANALYSIS OF PATIENT SAFETY MEASURES IN THE PRIVATE SECONDARY CARE HOSPITALS OF NANDED CITY',
    categories: ['Medical'],
    authors: ['Dr. KHAN GAZALA MD AMANULLAH'],
    publisher: 'KY Publications',
    publishedDate: '2018-03-01',
    language: 'en',
    pageCount: 299,
    thumbnail:
      'http://books.google.com/books/content?id=1Dd1DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=1Dd1DwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=11&source=gbs_api',
  },
  {
    title: 'A Detailed Survey On Religiosity And Paranormal Experiences',
    description:
      'This study is about people in their formative years. It is about their beliefs and practices. It is about their personality and how it relates to their beliefs. It involves empirical investigation of 1800 college going men (882) and women (918) with an average age of about 20 years. The subjects are predominantly Hindu (85%), with 12% Christian and 3% Muslim student attending colleges in Visakhapatnam urban area. Data were collected from them using the Myers-Briggs Type Indicator (MBTI) and the two specially developed questionnaires that survey religiosity and paranormal beliefs and experiences. Paranormal beliefs and experiences surveyed included sacred as well as secular beliefs, experiences, and practices. While several studies in the West attempted to explore the relationships between personality, paranormal beliefs and religious practices and experiences, there are hardly any investigations in non-Judeo-Christian cultures. The present study can help by throwing light on the cross-cultural relevance of these findings.',
    categories: ['Architecture'],
    authors: ['JACKSAN JUDAN FERNANDES'],
    publisher: 'Book Rivers',
    publishedDate: '2020-10-24',
    language: 'en',
    pageCount: 223,
    thumbnail:
      'http://books.google.com/books/content?id=7BwFEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=7BwFEAAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=12&source=gbs_api',
  },
  {
    title: 'The Psychology of Money',
    subTitle: 'Timeless lessons on wealth, greed, and happiness',
    description:
      'Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together. In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.',
    categories: ['Business & Economics'],
    authors: ['Morgan Housel'],
    publisher: 'Harriman House Limited',
    publishedDate: '2020-09-08',
    language: 'en',
    pageCount: 209,
    thumbnail:
      'http://books.google.com/books/content?id=TnrrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=TnrrDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=13&source=gbs_api',
  },
  {
    title: 'Mathematics for Machine Learning',
    description:
      'Distills key concepts from linear algebra, geometry, matrices, calculus, optimization, probability and statistics that are used in machine learning.',
    categories: ['Computers'],
    authors: ['Marc Peter Deisenroth', 'A. Aldo Faisal', 'Cheng Soon Ong'],
    publisher: 'Cambridge University Press',
    publishedDate: '2020-04-23',
    language: 'en',
    pageCount: 391,
    thumbnail:
      'http://books.google.com/books/content?id=pFjPDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=pFjPDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=14&source=gbs_api',
  },
  {
    title: 'Book Design Made Simple',
    subTitle:
      'A Step-By-Step Guide to Designing and Typesetting Your Own Book Using Adobe Indesign',
    description:
      "Book Design Made Simple gives DIY authors, small presses, and graphic designers--novices and experts alike--the power to design their own books. It's the first comprehensive book of its kind, explaining every step from installing Adobe(R) InDesign(R) right through to sending the files to press. For those who want to design their own books but have little idea how to proceed, Book Design Made Simple is a semester of book design instruction plus a publishing class rolled into one. Let two experts guide you through the process with easy step-by-step instructions, resulting in a professional-looking top-quality book",
    categories: ['Design'],
    authors: ['Fiona Raven', 'Glenna Collett'],
    publishedDate: '2017',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=0jxUMQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=0jxUMQAACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=15&source=gbs_api',
  },
  {
    title: 'ISBN - Internationale Standard-Buchnummer',
    subTitle: '',
    description:
      'Innovative ideas are never easily accepted. Due to the electronic revolution of the information supply new management tools and infrastructures were required. The as simple as brilliant tool the ISBN which assigns each book with a unique number has contributed vastly to the global book and information market.',
    categories: ['Bibliography'],
    authors: [' Walravens, Hartmut'],
    publisher: 'Simon Bibliothekswissen',
    publishedDate: '2010',
    language: 'en',
    pageCount: 234,
    thumbnail:
      'http://books.google.com/books/content?id=i1lrYuczMUMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=i1lrYuczMUMC&pg=PA203&dq=isbn&hl=&as_pt=BOOKS&cd=16&source=gbs_api',
  },
  {
    title: 'Parenteral Medications, Fourth Edition',
    description:
      'Parenteral Medications is an authoritative, comprehensive reference work on the formulation and manufacturing of parenteral dosage forms, effectively balancing theoretical considerations with practical aspects of their development. Previously published as a three-volume set, all volumes have been combined into one comprehensive publication that addresses the plethora of changes in the science and considerable advances in the technology associated with these products and routes of administration. Key Features: Provides a comprehensive reference work on the formulation and manufacturing of parenteral dosage forms Addresses changes in the science and advances in the technology associated with parenteral medications and routes of administration Includes 13 new chapters and updated chapters throughout Contains the contributors of leading researchers in the field of parenteral medications Uses full color detailed illustrations, enhancing the learning process The fourth edition not only reflects enhanced content in all the chapters but also highlights the rapidly advancing formulation, processing, manufacturing parenteral technology including advanced delivery and cell therapies. The book is divided into seven sectionss: Section 1 - Parenteral Drug Administration and Delivery Devices; Section 2 - Formulation Design and Development; Section 3 - Specialized Drug Delivery Systems; Section 4 - Primary Packaging and Container Closure Integrity; Section 5 - Facility Design and Environmental Control; Section 6 - Sterilization and Pharmaceutical Processing; Section 7 - Quality Testing and Regulatory Requirements',
    categories: ['Business & Economics'],
    authors: ['Sandeep Nema', 'John D. Ludwig'],
    publisher: 'CRC Press',
    publishedDate: '2019-07-19',
    language: 'en',
    pageCount: 2756,
    thumbnail:
      'http://books.google.com/books/content?id=3wekDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=3wekDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=17&source=gbs_api',
  },
  {
    title: 'Forecasting: principles and practice',
    description:
      'Forecasting is required in many situations. Stocking an inventory may require forecasts of demand months in advance. Telecommunication routing requires traffic forecasts a few minutes ahead. Whatever the circumstances or time horizons involved, forecasting is an important aid in effective and efficient planning. This textbook provides a comprehensive introduction to forecasting methods and presents enough information about each method for readers to use them sensibly.',
    categories: ['Business & Economics'],
    authors: ['Rob J Hyndman', 'George Athanasopoulos'],
    publisher: 'OTexts',
    publishedDate: '2018-05-08',
    language: 'en',
    pageCount: 380,
    thumbnail:
      'http://books.google.com/books/content?id=_bBhDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=_bBhDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=19&source=gbs_api',
  },
  {
    title: 'Nri',
    subTitle: 'Now, Returned to India: (Amol Dixit Series Book 1)',
    description:
      "Moving back to India was the last thing on Amol Dixit's mind when he was leading a carefree life in Chicago. Then one day, he found himself sleeping on the streets of Mumbai. Now, Returned to India is a Back-to-Rags story of a Non Resident Indian (NRI), and is a humorous account of the experiences of Amol Dixit, who relocates to India in haste. It all begins when he interviews for a job that he doesn't really need. He plans to spend one year with his family in India, following which he would move back to North America. In a series of missteps which affect his personal, social and work life, and cost him the woman he loves, Amol learns the hard way that living in India is no cakewalk. Inspite of these challenges, he decides to remain in India. Just when his life has hit rock bottom, GB enters his life. NRI: Now, Returned to India, is the first book in a four part fiction series that deals with the life of Amol Dixit and is the author's debut novel. It was shortlisted by DNA- Hachette in India for the \"Hunt for the Next Bestseller\" competition in 2014. Amar' spast writing exploits include blogging about his experiences in India at the Return to India Forum, which have received over 110,000 views.",
    authors: ['Amar Vyas'],
    publisher: 'Createspace Independent Publishing Platform',
    publishedDate: '2014-09-08',
    language: 'en',
    pageCount: 286,
    thumbnail:
      'http://books.google.com/books/content?id=aUn9wAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=aUn9wAEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=20&source=gbs_api',
  },
  {
    title: 'National Geographic Kids in the Jungle Sticker Activity Book',
    subTitle: 'Over 1,000 Stickers!',
    description:
      'An exciting interactive title chock-full of colorful toucans, jaguars, jumping tree frogs, and swinging monkeys, brings National Geographic Kids signature content to a sticker and activity book format. Packed with mazes, spelling and pattern games, drawing activities, and more, kids are sure to love these pages loaded with fun.',
    categories: ['Juvenile Nonfiction'],
    authors: ['National Geographic Kids'],
    publisher: 'Ng Sticker Activity Books',
    publishedDate: '2015-07-14',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=W1DArQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=W1DArQEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=22&source=gbs_api',
  },
  {
    title: 'Faulkner’s Treatment of Women',
    description:
      'The overview of William Faulkner‟s scholarship shows certain obvious limitations in concern to his treatment to his fictional female characters. Critics have concentrated on the male characters the outmost. The first limitation is that the critics have not paid the needed attention to his treatment of the female characters in their totality. Critics have taken up Faulkner‟s characterization but their concentration is more on the male figures only. If at all they discuss women characters, they are seen as figure only. If at all they discuss women characters, they are seen as subordinate figures to their male counterparts. The second limitation is that the bulk of Faulkner scholarship treats Faulkner‟s individual works, in these studies also the concentration is mainly on the themes and techniques, and the discussion on female characters is again scanty. Quite a few studies concentrate deeply on his individual works and explain Faulkner‟s larger themes but they, too, are specifically male oriented. The next limitation is that a large number of articles, appearing in various decades, also, cover individual aspects of Faulkner‟s themes and characters, and give only partial treatment to his women characters. The fourth limitation is that even while discussing Faulkner as moralist the concentration is more on the male figure than the female figures. The last limitation of Faulkner scholarship is that mostly it concentrates on his craftsmanship; a large number of studies on Faulkner assess his stylistics and technique. Tracing technical aspects, thematic patterns, and stylistic devices used by him critics establish Faulkner scholarship, but are oblivion to the central thrust of women characters. Thus Faulkner scholarship treats women characters, either as secondary characters, or, at the most, in relation to their male counterparts only. They have been treated less as individuals than as common commodities; the critics have been casual in their approach towards women characters and taken them for granted. This nonchalant view may lead us to conclude that women in Faulkner are „a silent sex‟. For that a complete survey has been done as mentioned in “Introduction” of the study to trace scope on full length study in context to Faulkner‟s women characters. At times, the survey let to conclude that Faulkner himself is not projecting as pleasant pictures of women in his novels as he does in the case of male figures. In fact, Faulkner was accused of being hostile to women. At times, Faulkner may strike us as a misogynist. These points led to give a kind of impulse to start working on the women characters in Faulkner. His imaginary fictional world – Yoknapatawpha- explains the intertexuality, so sometimes the same women character in different types of roles in his novels, or shows amelioration and redemption in his other text. Keeping all these points in consideration as his indispensable women characters fascinate to study in-depth and I could got the form under the heading Faulkner’s Treatment of Women. It is a humble attempt; I do not claim it to the last word on the issue. -Dr. Vibha Manoj sharma',
    categories: ['Literary Criticism'],
    authors: ['Dr. Vibha Manoj Sharma'],
    publisher: 'KY Publications',
    publishedDate: '2017-01-01',
    language: 'en',
    pageCount: 179,
    thumbnail:
      'http://books.google.com/books/content?id=Ae6hDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=Ae6hDwAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=23&source=gbs_api',
  },
  {
    title: 'The Midnight Line',
    subTitle: '(Jack Reacher 22)',
    description:
      "THE NUMBER ONE BESTSELLER/A RICHARD & JUDY BOOKCLUB 2018 PICK Jack Reacher is having a bad day. It would be a dumb idea to make it worse. Reacher sees a West Point class ring in a pawn shop window. It's tiny. It's a woman cadet's graduation present to herself. Why would she give it up? Reacher was a West Pointer too, and he knows what she went through to get it. All he wants is to find the woman. He'll have to go through bikers, cops, crooks, and low-life muscle. If she's ok, he'll walk away. If she's not ... he'll stop at nothing. Best advice: stay out of his way. _________ Although the Jack Reacher novels can be read in any order, The Midnight Line follows on directly from the end of Make Me. And be sure not to miss Reacher's newest adventure, no.27, No Plan B! ***OUT NOW***",
    categories: ['Fiction'],
    authors: ['Lee Child'],
    publisher: 'Random House',
    publishedDate: '2017-11-07',
    language: 'en',
    pageCount: 408,
    thumbnail:
      'http://books.google.com/books/content?id=5yFVDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=5yFVDgAAQBAJ&printsec=frontcover&dq=isbn&hl=&as_pt=BOOKS&cd=25&source=gbs_api',
  },
  {
    title: 'Bicycle Your France (Loop Directions) Secret Burgundy (ISBN)',
    description:
      'This is a companion guide and just the segment directions, profiles and maps for the 2nd guide of the series, BICYCLE YOUR FRANCE: SECRET BURGUNDY.It is 9" wide by 6" high and perfect bound along the top, a more suitable size to take on a ride.Each of the 16 loops has a 1-page map, a profile and tested segment directions.Check on the SECRET BURGUNDY book for the complete book.Ride safe. Enjoy the loops; enjoy the adventure.',
    authors: ['Walter Judson Moore'],
    publishedDate: '2008-09-11',
    language: 'en',
    pageCount: 104,
    thumbnail:
      'http://books.google.com/books/content?id=xkwSm52JdaEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=xkwSm52JdaEC&pg=PP3&dq=isbn&hl=&as_pt=BOOKS&cd=26&source=gbs_api',
  },
  {
    title: 'Campbell Essential Biology',
    description:
      "ALERT: Before you purchase, check with your instructor or review your course syllabus to ensure that you select the correct ISBN. Several versions of Pearson's MyLab & Mastering products exist for each title, including customized versions for individual schools, and registrations are not transferable. In addition, you may need a CourseID, provided by your instructor, to register for and use Pearson's MyLab & Mastering products. Packages Access codes for Pearson's MyLab & Mastering products may not be included when purchasing or renting from companies other than Pearson; check with the seller before completing your purchase. Used or rental books If you rent or purchase a used book with an access code, the access code may have been redeemed previously and you may have to purchase a new access code. Access codes Access codes that are purchased from sellers other than Pearson carry a higher risk of being either the wrong ISBN or a previously redeemed code. Check with the seller prior to purchase. -- Campbell Essential Biology with MasteringBiology®, Fifth Edition, makes biology irresistibly interesting for non-majors biology students. This best-selling text, known for its scientific accuracy and currency, makes biology relevant and approachable with increased use of analogies, real world examples, more conversational language, and intriguing questions. Over 100 new MasteringBiology activities engage students outside of the classroom, plus new PowerPoint® presentations on issues like infectious disease and climate change offer a springboard for high-impact lectures. Campbell Essential Biology... make biology irresistibly interesting. 0321763335 / 9780321763334 Campbell Essential Biology Plus MasteringBiology with eText -- Access Card Package Package consists of: 0321772598 / 9780321772596 Campbell Essential Biology 0321791711 / 9780321791719 MasteringBiology with Pearson eText -- Valuepack Access Card -- for Campbell Essential Biology (with Physiology chapters) (ME component)",
    categories: ['Biology'],
    authors: ['Eric Jeffrey Simon', 'Jean Dickey', 'Jane B. Reece'],
    publisher: 'Benjamin-Cummings Publishing Company',
    publishedDate: '2013',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=O7xwxAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=O7xwxAEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=27&source=gbs_api',
  },
  {
    title: 'Port-au-Prince Relief Map Book ISBN',
    description:
      'This is a high-quality Map Book of Port-au-Prince, Haiti, and its surrounding areas. The purpose of this map series is to aid relief workers in their recovery operations, by providing useful landmarks and accurate street data. Also included is a Street Index and Medical Facility Index to make areas of interest easier to find. NVision will donate 40% of all profits made from the Haiti Relief Map Books to the American Red Cross.',
    authors: ['NVision, Inc Solutions'],
    publisher: 'Lulu.com',
    publishedDate: '2010-02-10',
    language: 'en',
    pageCount: 127,
    thumbnail:
      'http://books.google.com/books/content?id=Omj0AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=Omj0AgAAQBAJ&pg=PP3&dq=isbn&hl=&as_pt=BOOKS&cd=30&source=gbs_api',
  },
  {
    title: 'Revenue and Customs Enforcement - Fraud',
    description:
      'A general guidance aimed at those wishing to gain a basic understanding of the operational side of revenue enforcement and the criminal investigation of revenue and customs frauds. This manual was not written with the view to be a blue-print of the law and practice surrounding criminal investigations in any one particular jurisdiction, but was written with the view to point out what is common practice in most English-speaking jurisdictions.',
    categories: ['Law'],
    authors: ['Peter Krause'],
    publisher: 'Peter Krause',
    publishedDate: '2018-05-01',
    language: 'en',
    pageCount: 659,
    thumbnail:
      'http://books.google.com/books/content?id=KvLJEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=KvLJEAAAQBAJ&pg=PP3&dq=isbn&hl=&as_pt=BOOKS&cd=31&source=gbs_api',
  },
  {
    title: 'ISBN 3-932949-11-0',
    description:
      'Das Buch enthält 18 Interviews mit Persönlichkeiten aus der Geschichte der Fotografie (Künstler, Fotografen und Kunsthistoriker). Die Interviews zeigen die vielfältigen Verknüpfungen zwischen europäischer und amerikanischer Kultur.',
    categories: ['Art'],
    authors: ['Anna Auer: Fotografie  im Gespräch'],
    publisher: 'Dietmar Klinger Verlag, Passau 2001',
    publishedDate: '2001-08-01',
    language: 'en',
    pageCount: 310,
    thumbnail:
      'http://books.google.com/books/content?id=vuKwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=vuKwDwAAQBAJ&pg=PA91&dq=isbn&hl=&as_pt=BOOKS&cd=32&source=gbs_api',
  },
  {
    title:
      'Life of Martin Luther King, Jr. through Philately (ISBN - 9789354934391)',
    subTitle: 'MLK Stamp Catalogue (Digital First Edition - 2022)',
    description:
      "Digital First Edition of Life of Martin Luther King, Jr., through Philately - MLK Stamp Catalog This Digital First Edition of MLK Stamps Catalog was created with intensive effort over many years and is meant to serve both as a world-wide stamp catalogue and as a means to learn more about the life of Martin Luther King, Jr., theActivist from Atlanta so we can apply his teachings in our daily lives. The brief summary of contents are as follows: 1. Beautifully illustrated with color images of 817 stamps on Martin Luther King, Jr., from all over the world 2. Covers all 89 issuers belonging to present day 77 countries apart from erstwhile stamp issuing authorities 3. It gives both country-wise and year-wise summary of stamp listings 4. Classification of genuine and illegal stamps 5. Contains images of stamps, souvenir sheets, FDCs, postcards etc. 6. Meant for use as a comprehensive collector’s guide for MLK stamps 7. Addresses of websites and email ids of postal authorities / agents, where you can buy genuine stamps at face value 8. All key events in the Life of Martin Luther King, Jr. summarized along with a brief memoir on theActivist from Atlanta and a few of his famous quotes along with a 'Did you know' section How to use Catabooks MLK Stamp Catalog? The Catalogue lists stamps by country of issue with a brief country profile along with a brief history of stamps and a note on postal authority. The next level of structure is by date (month or year if date is not available) of issue. The following information is made available for each stamp: 1. CMC No. - The Catabooks MLK Stamps Catalog (CMC) has a unique CMC number to easily identify legal stamps issued on MLK using 2 letters country code as per ISO 3166-2, 3 digits stand-alone year-wise serial number for MLK stamps and the four digits for the year after ‘M’, a character to denote Martin Luther King, Jr. 2. Image of the stamp / miniature sheet and first day cover, folder, etc. to the extent possible 3. Basic information about the stamp 4. Denomination in local currency 5. Quantity of stamps issued, if available 6. Date of Issue (wherever date is not available, the year is given) 7. Nature of Issue like definitive (regular issuance for postal use) or commemorative (special issuance mostly for collectors), or if meant only for air post, if available 8. Shape of Issue with dimensions, if available 9. Serrations: Perforations made to the sheet, which are printed to have a specific number of stamps, to ease their splitting also referred to as perforated (meaning stamp with cutting rows and columns of small holes). It is called imperforate where this is no separation, especially the earlier stamps. 10. WNS No. We wish you the very best in your stamp collecting hobby and happy reading.",
    categories: ['Antiques & Collectibles'],
    authors: ['Lavanya R'],
    publisher: 'Catabooks',
    publishedDate: '2022-07-04',
    language: 'en',
    pageCount: 502,
    thumbnail:
      'http://books.google.com/books/content?id=A6KSEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=A6KSEAAAQBAJ&pg=PA2&dq=isbn&hl=&as_pt=BOOKS&cd=33&source=gbs_api',
  },
  {
    title: 'Concepts of Biology',
    description:
      "Concepts of Biology is designed for the single-semester introduction to biology course for non-science majors, which for many students is their only college-level science course. As such, this course represents an important opportunity for students to develop the necessary knowledge, tools, and skills to make informed decisions as they continue with their lives. Rather than being mired down with facts and vocabulary, the typical non-science major student needs information presented in a way that is easy to read and understand. Even more importantly, the content should be meaningful. Students do much better when they understand why biology is relevant to their everyday lives. For these reasons, Concepts of Biology is grounded on an evolutionary basis and includes exciting features that highlight careers in the biological sciences and everyday applications of the concepts at hand.We also strive to show the interconnectedness of topics within this extremely broad discipline. In order to meet the needs of today's instructors and students, we maintain the overall organization and coverage found in most syllabi for this course. A strength of Concepts of Biology is that instructors can customize the book, adapting it to the approach that works best in their classroom. Concepts of Biology also includes an innovative art program that incorporates critical thinking and clicker questions to help students understand--and apply--key concepts.",
    categories: ['Science'],
    authors: ['Samantha Fowler', 'Rebecca Roush', 'James Wise'],
    publishedDate: '2018-01-07',
    language: 'en',
    pageCount: 618,
    thumbnail:
      'http://books.google.com/books/content?id=sUZRswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=sUZRswEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=34&source=gbs_api',
  },
  {
    title: 'The Dreaming Kind',
    subTitle: 'Short Stories and Fantasies',
    description:
      'A collection of short stories by acclaimed Science Fiction and Fantasy author C. S. Friedman',
    authors: ['C. S. Friedman'],
    publisher: 'Tridac Publishing',
    publishedDate: '2021-05-30',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=BQN7zgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=BQN7zgEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=35&source=gbs_api',
  },
  {
    title: 'The Public Domain',
    subTitle: 'How to Find Copyright-free Writings, Music, Art & More',
    description:
      'Explains how to find and use creative works without permission or fees, describing how to recognize whether or not a work is in the public domain.',
    categories: ['Art'],
    authors: ['Stephen Fishman'],
    publisher: 'NOLO',
    publishedDate: '2000',
    language: 'en',
    pageCount: 558,
    thumbnail:
      'http://books.google.com/books/content?id=IQbs40bweeEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=IQbs40bweeEC&q=isbn&dq=isbn&hl=&as_pt=BOOKS&cd=36&source=gbs_api',
  },
  {
    title: 'Ego, Sheep, and Knittery: Being Humble and Other Great Stuff',
    description:
      'Having confidence is important. But so is learning to be humble.',
    categories: ['Juvenile Fiction'],
    authors: ['Eevi Jones'],
    publisher: 'Lhc Publishing',
    publishedDate: '2021-09-30',
    language: 'en',
    pageCount: 38,
    thumbnail:
      'http://books.google.com/books/content?id=90uRzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=90uRzgEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=37&source=gbs_api',
  },
  {
    title: 'Algebra and Trigonometry',
    description:
      '"The text is suitable for a typical introductory algebra course, and was developed to be used flexibly. While the breadth of topics may go beyond what an instructor would cover, the modular approach and the richness of content ensures that the book meets the needs of a variety of programs."--Page 1.',
    categories: ['Algebra'],
    authors: [
      'Jay P. Abramson',
      'Valeree Falduto',
      'Rachael Gross (Mathematics teacher)',
      'David Lippman',
      'Rick Norwood',
      'Melonie Rasmussen',
      'Nicholas Belloit',
      'Jean-Marie Magnier',
      'Harold Whipple',
      'Christina Fernandez',
    ],
    publishedDate: '2015-02-13',
    language: 'en',
    pageCount: 1564,
    thumbnail:
      'http://books.google.com/books/content?id=pRIXrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=pRIXrgEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=38&source=gbs_api',
  },
  {
    title: 'U.S. History',
    description:
      'Printed in color. U.S. History is designed to meet the scope and sequence requirements of most introductory courses. The text provides a balanced approach to U.S. history, considering the people, events, and ideas that have shaped the United States from both the top down (politics, economics, diplomacy) and bottom up (eyewitness accounts, lived experience). U.S. History covers key forces that form the American experience, with particular attention to issues of race, class, and gender.',
    authors: ['P. Scott Corbett', 'Volker Janssen', 'John M. Lund'],
    publishedDate: '2023-04-02',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=4bPezwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=4bPezwEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=39&source=gbs_api',
  },
  {
    title: 'Microbiology',
    description:
      '"Microbiology covers the scope and sequence requirements for a single-semester microbiology course for non-majors. The book presents the core concepts of microbiology with a focus on applications for careers in allied health. The pedagogical features of the text make the material interesting and accessible while maintaining the career-application focus and scientific rigor inherent in the subject matter. Microbiology\'s art program enhances students\' understanding of concepts through clear and effective illustrations, diagrams, and photographs. Microbiology is produced through a collaborative publishing agreement between OpenStax and the American Society for Microbiology Press. The book aligns with the curriculum guidelines of the American Society for Microbiology."--BC Campus website.',
    categories: ['Microbiology'],
    authors: [
      'Nina Parker',
      'OpenStax',
      'Mark Schneegurt',
      'AnhHue Thi Tu',
      'Brian M. Forster',
      'Philip Lister',
    ],
    publishedDate: '2016-05-30',
    language: 'en',
    pageCount: 1301,
    thumbnail:
      'http://books.google.com/books/content?id=tSzPjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=tSzPjwEACAAJ&dq=isbn&hl=&as_pt=BOOKS&cd=40&source=gbs_api',
  },
];

const techNologyData = [
  {
    title: 'The Future of Technology',
    description:
      'From the industrial revolution to the railway age, through the era of electrification, the advent of mass production, and finally to the information age, the same pattern keeps repeating itself. An exciting, vibrant phase of innovation and financial speculation is followed by a crash, after which begins a longer, more stately period during which the technology is actually deployed properly. This collection of surveys and articles from The Economist examines how far technology has come and where it is heading. Part one looks at topics such as the “greying” (maturing) of IT, the growing importance of security, the rise of outsourcing, and the challenge of complexity, all of which have more to do with implementation than innovation. Part two looks at the shift from corporate computing towards consumer technology, whereby new technologies now appear first in consumer gadgets such as mobile phones. Topics covered will include the emergence of the mobile phone as the “digital Swiss Army knife”; the rise of digital cameras, which now outsell film-based ones; the growing size and importance of the games industry and its ever-closer links with other more traditional parts of the entertainment industry; and the social impact of technologies such as text messaging, Wi-Fi, and camera phones. Part three considers which technology will lead the next great phase of technological disruption and focuses on biotechnology, energy technology, and nanotechnology.',
    categories: ['Business & Economics'],
    authors: ['Tom Standage'],
    publisher: 'John Wiley & Sons',
    publishedDate: '2005-08-01',
    language: 'en',
    pageCount: 372,
    thumbnail:
      'http://books.google.com/books/content?id=tgNwXEvr_mwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=tgNwXEvr_mwC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=1&source=gbs_api',
  },
  {
    title: 'Technology and Society',
    subTitle: 'Building our Sociotechnical Future',
    description:
      "An anthology of writings by thinkers ranging from Freeman Dyson to Bruno Latour that focuses on the interconnections of technology, society, and values and how these may affect the future. Technological change does not happen in a vacuum; decisions about which technologies to develop, fund, market, and use engage ideas about values as well as calculations of costs and benefits. This anthology focuses on the interconnections of technology, society, and values. It offers writings by authorities as varied as Freeman Dyson, Laurence Lessig, Bruno Latour, and Judy Wajcman that will introduce readers to recent thinking about technology and provide them with conceptual tools, a theoretical framework, and knowledge to help understand how technology shapes society and how society shapes technology. It offers readers a new perspective on such current issues as globalization, the balance between security and privacy, environmental justice, and poverty in the developing world. The careful ordering of the selections and the editors' introductions give Technology and Society a coherence and flow that is unusual in anthologies. The book is suitable for use in undergraduate courses in STS and other disciplines. The selections begin with predictions of the future that range from forecasts of technological utopia to cautionary tales. These are followed by writings that explore the complexity of sociotechnical systems, presenting a picture of how technology and society work in step, shaping and being shaped by one another. Finally, the book goes back to considerations of the future, discussing twenty-first-century challenges that include nanotechnology, the role of citizens in technological decisions, and the technologies of human enhancement.",
    categories: ['Technology & Engineering'],
    authors: ['Deborah G. Johnson', 'Jameson M. Wetmore'],
    publisher: 'MIT Press',
    publishedDate: '2008-10-17',
    language: 'en',
    pageCount: 853,
    thumbnail:
      'http://books.google.com/books/content?id=sAr-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=sAr-DwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=2&source=gbs_api',
  },
  {
    title: 'How Technology Works',
    subTitle: 'The facts visually explained',
    description:
      "Have you ever asked yourself how the inventions, gadgets, and devices that surround us actually work? Discover the hidden workings of everyday technology with this graphic guide. How Technology Works demystifies the machinery that keeps the modern world going, from simple objects such as zip fasteners and can openers to the latest, most sophisticated devices of the information age, including smart watches, personal digital assistants, and driverless cars. It includes inventions that have changed the course of history, like the internal combustion engine, as well as technologies that might hold the key to our future survival, including solar cells and new kinds of farming to feed a growing population. All the way through the book, step-by-step explanations are supported by simple and original graphics that take devices apart and show you how they work. The opening chapter explains principles that underpin lots of devices - from basic mechanics to electricity to digital technology. From there on, devices are grouped by application - such as the home, transport, and computing - making them easy to find and placing similar devices side by side. How Technology Works is perfect for anyone who didn't have a training in STEM subjects at school or is simply curious about how the modern world works.",
    categories: ['Technology & Engineering'],
    authors: ['DK'],
    publisher: 'Dorling Kindersley Ltd',
    publishedDate: '2019-04-04',
    language: 'en',
    pageCount: 256,
    thumbnail:
      'http://books.google.com/books/content?id=m8XhDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=m8XhDwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=3&source=gbs_api',
  },
  {
    title: 'Technology and Health',
    subTitle: 'Promoting Attitude and Behavior Change',
    description:
      'Technology and Health: Promoting Attitude and Behavior Change examines how technology can be used to promote healthier attitudes and behavior. The book discusses technology as a tool to deliver media content. This book synthesizes theory-driven research with implications for research and practice. It covers a range of theories and technology in diverse health contexts. The book covers why and how specific technologies, such as virtual reality, augmented reality, mobile games, and social media, are effective in promoting good health. The book additionally suggests how technology should be designed, utilized, and evaluated for health interventions. Includes new technologies to improve both mental and physical health Examines technologies in relation to cognitive change Discusses persuasion as a tool for behavioral and attitudinal changes Provides theoretical frameworks for the effective use of technology',
    categories: ['Computers'],
    authors: ['Jihyun Kim', 'Hayeon Song'],
    publisher: 'Academic Press',
    publishedDate: '2020-03-06',
    language: 'en',
    pageCount: 428,
    thumbnail:
      'http://books.google.com/books/content?id=sE_VDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=sE_VDwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=4&source=gbs_api',
  },
  {
    title: 'Teaching about Technology',
    subTitle:
      'An Introduction to the Philosophy of Technology for Non-philosophers',
    description:
      'This book provides an introduction to the philosophy of technology that is accessible to non-philosophers. It offers a survey of the current state-of-affairs in the philosophy of technology and also discusses the relevance of that for teaching about technology. The book includes questions and assignments and offers an extensive annotated bibliography for those who want to read more about the discipline.',
    categories: ['Education'],
    authors: ['Marc J. de Vries'],
    publisher: 'Springer Science & Business Media',
    publishedDate: '2005-05-04',
    language: 'en',
    pageCount: 192,
    thumbnail:
      'http://books.google.com/books/content?id=P_5xpTT66jUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=P_5xpTT66jUC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=5&source=gbs_api',
  },
  {
    title: 'Global Technological Change',
    subTitle: 'From Hard Technology to Soft Technology',
    description:
      '"This volume indicates that the complex problems we are facing in the 21st century can only be solved by a balance between \'yin-yang\' environment, between the hard technology (machine-centred) and the soft technology (human-centred). This concept is invaluable as it conveys a new perspective of the assumptions about the relationships between technological innovation, institutional innovation, as well as of the gap between the developed and developing countries at the turn of the new millennium. Karamjit S. Gill" -- back cover.',
    categories: ['Business & Economics'],
    authors: ['Zhouying Jin'],
    publisher: 'Intellect Books',
    publishedDate: '2005',
    language: 'en',
    pageCount: 324,
    thumbnail:
      'http://books.google.com/books/content?id=IONOAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=IONOAAAAMAAJ&q=technology&dq=technology&hl=&as_pt=BOOKS&cd=7&source=gbs_api',
  },
  {
    title: 'Food Engineering And Technology',
    description:
      'Food Engineering & Technology: A Practice Book deals with objective type questions and answers. The book is aimed to provide number of questions related to almost all the main aspects of the Food Technology. Efforts have been made to cover wide range of topics in accordance to the syllabus of various competitive examinations like JRF, SRF, ARS, GATE, etc. It is expected that the book will be much sought by the students of Food Science/Technology/Engineering and related disciplines who can prepare themselves for both written as well as oral examinations. At the same time, this can be used as a readily available handbook for quick reference by practicing researchers/technologists and engineers. Besides faculty members involved in teaching Food Technology will find the book useful as a good question bank.',
    categories: ['Technology & Engineering'],
    authors: ['Sharma, H.K. ', 'A.Upadhyay'],
    publisher: 'New India Publishing Agency',
    publishedDate: '2015-01-15',
    language: 'en',
    pageCount: 6,
    thumbnail:
      'http://books.google.com/books/content?id=xTCgEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=xTCgEAAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=8&source=gbs_api',
  },
  {
    title: 'Wire Technology',
    subTitle: 'Process Engineering and Metallurgy',
    description:
      'Wire Technology: Process Engineering and Metallurgy, Second Edition, covers new developments in high-speed equipment and the drawing of ultra-high strength steels, along with new computer-based design and analysis software and techniques, including Finite Element Analysis. In addition, the author shares his design and risk prediction calculations, as well as several new case studies. New and extended sections cover measurement and instrumentation, die temperature and cooling, multiwire drawing, and high strength steel wire. Coverage of process economics has been greatly enhanced, including an exploration of product yields and cost analysis, as has the coverage of sustainability aspects such as energy use and recycling. As with the first edition, questions and problems are included at the end of each chapter to reinforce key concepts. Written by an internationally-recognized specialist in wire drawing with extensive academic and industry experience Provides real-world examples, problems, and case studies that allow engineers to easily apply the theory to their workplace, thus improving productivity and process efficiency Covers both ferrous and non-ferrous metals in one volume',
    categories: ['Technology & Engineering'],
    authors: ['Roger N. Wright'],
    publisher: 'Butterworth-Heinemann',
    publishedDate: '2016-01-21',
    language: 'en',
    pageCount: 340,
    thumbnail:
      'http://books.google.com/books/content?id=t7Z0BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=t7Z0BgAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=9&source=gbs_api',
  },
  {
    title: 'Sensor Technology Handbook',
    description:
      'Sensor fundamentals -- Application considerations -- Measurement issues and criteria -- Sensor signal conditioning -- Acceleration, shock and vibration sensors -- Biosensors -- Chemical sensors -- Capacitive and inductive displacement sensors -- Electromagnetism in sensing -- Flow and level sensors -- Force, load and weight sensors -- Humidity sensors -- Machinery vibration monitoring sensors -- Optical and radiation sensors -- Position and motion sensors -- Pressure sensors -- Sensors for mechanical shock -- Test and measurement microphones -- Strain gages -- Temperature sensors -- Nanotechnology-enabled sensors -- Wireless sensor networks: principles and applications.',
    categories: ['Technology & Engineering'],
    authors: ['Jon S. Wilson'],
    publisher: 'Newnes',
    publishedDate: '2005',
    language: 'en',
    pageCount: 706,
    thumbnail:
      'http://books.google.com/books/content?id=hPPM8G4kI0wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=hPPM8G4kI0wC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=11&source=gbs_api',
  },
  {
    title:
      'Cross-Industry Use of Blockchain Technology and Opportunities for the Future',
    description:
      'Blockchain is a technology that transcends cryptocurrencies. There are other services in different sectors of the economy that can benefit from the trust and security that blockchains offer. For example, financial institutions are using blockchains for international money transfer, and in logistics, it has been used for supply chain management and tracking of goods. As more global companies and governments are experimenting and deploying blockchain solutions, it is necessary to compile knowledge on the best practices, strategies, and failures in order to create a better awareness of how blockchain could either support or add value to other services. Cross-Industry Use of Blockchain Technology and Opportunities for the Future provides emerging research highlighting the possibilities inherent in blockchain for different sectors of the economy and the added value blockchain can provide for the future of these different sectors. Featuring coverage on a broad range of topics such as data privacy, information sharing, and digital identity, this book is ideally designed for IT specialists, consultants, design engineers, cryptographers, service designers, researchers, academics, government officials, and industry professionals.',
    categories: ['Computers'],
    authors: ['Williams, Idongesit'],
    publisher: 'IGI Global',
    publishedDate: '2020-05-22',
    language: 'en',
    pageCount: 228,
    thumbnail:
      'http://books.google.com/books/content?id=gEThDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=gEThDwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=12&source=gbs_api',
  },
  {
    title: 'History of Technology',
    description:
      'The technical problems confronting different societies and periods, and the measures taken to solve them form the concern of this annual collection of essays. Volumes contain technical articles ranging widely in subject, time and region, as well as general papers on the history of technology. In addition to dealing with the history of technical discovery and change, History of Technology also explores the relations of technology to other aspects of life -- social, cultural and economic -- and shows how technological development has shaped, and been shaped by, the society in which it occurred.',
    categories: ['History'],
    authors: ['Graham Hollister-Short'],
    publisher: 'Bloomsbury Publishing',
    publishedDate: '2016-09-30',
    language: 'en',
    pageCount: 320,
    thumbnail:
      'http://books.google.com/books/content?id=oQfeDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=oQfeDAAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=13&source=gbs_api',
  },
  {
    title: 'Particle Technology and Engineering',
    subTitle:
      "An Engineer's Guide to Particles and Powders: Fundamentals and Computational Approaches",
    description:
      'Particle Technology and Engineering presents the basic knowledge and fundamental concepts that are needed by engineers dealing with particles and powders. The book provides a comprehensive reference and introduction to the topic, ranging from single particle characterization to bulk powder properties, from particle-particle interaction to particle-fluid interaction, from fundamental mechanics to advanced computational mechanics for particle and powder systems. The content focuses on fundamental concepts, mechanistic analysis and computational approaches. The first six chapters present basic information on properties of single particles and powder systems and their characterisation (covering the fundamental characteristics of bulk solids (powders) and building an understanding of density, surface area, porosity, and flow), as well as particle-fluid interactions, gas-solid and liquid-solid systems, with applications in fluidization and pneumatic conveying. The last four chapters have an emphasis on the mechanics of particle and powder systems, including the mechanical behaviour of powder systems during storage and flow, contact mechanics of particles, discrete element methods for modelling particle systems, and finite element methods for analysing powder systems. This thorough guide is beneficial to undergraduates in chemical and other types of engineering, to chemical and process engineers in industry, and early stage researchers. It also provides a reference to experienced researchers on mathematical and mechanistic analysis of particulate systems, and on advanced computational methods. Provides a simple introduction to core topics in particle technology: characterisation of particles and powders: interaction between particles, gases and liquids; and some useful examples of gas-solid and liquid-solid systems Introduces the principles and applications of two useful computational approaches: discrete element modelling and finite element modelling Enables engineers to build their knowledge and skills and to enhance their mechanistic understanding of particulate systems',
    categories: ['Technology & Engineering'],
    authors: ['Jonathan P.K. Seville', 'Chuan-Yu Wu'],
    publisher: 'Butterworth-Heinemann',
    publishedDate: '2016-05-20',
    language: 'en',
    pageCount: 294,
    thumbnail:
      'http://books.google.com/books/content?id=AsacBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=AsacBAAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=14&source=gbs_api',
  },
  {
    title: 'Annual Review in Automatic Programming',
    subTitle:
      'International Tracts in Computer Science and Technology and Their Application',
    description:
      'Computer Science and Technology and their Application is an eight-chapter book that first presents a tutorial on database organization. Subsequent chapters describe the general concepts of Simula 67 programming language; incremental compilation and conversational interpretation; dynamic syntax; the ALGOL 68. Other chapters discuss the general purpose conversational system for graphical programming and automatic theorem proving based on resolution. A survey of extensible programming language is also shown.',
    categories: ['Computers'],
    authors: ['Mark I. Halpern', 'William C. Mcgee', 'Louis Bolliet'],
    publisher: 'Elsevier',
    publishedDate: '2014-05-17',
    language: 'en',
    pageCount: 316,
    thumbnail:
      'http://books.google.com/books/content?id=O2eeBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=O2eeBQAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=15&source=gbs_api',
  },
  {
    title: 'Media Technologies',
    subTitle: 'Essays on Communication, Materiality, and Society',
    description:
      'Scholars from communication and media studies join those from science and technology studies to examine media technologies as complex, sociomaterial phenomena. In recent years, scholarship around media technologies has finally shed the assumption that these technologies are separate from and powerfully determining of social life, looking at them instead as produced by and embedded in distinct social, cultural, and political practices. Communication and media scholars have increasingly taken theoretical perspectives originating in science and technology studies (STS), while some STS scholars interested in information technologies have linked their research to media studies inquiries into the symbolic dimensions of these tools. In this volume, scholars from both fields come together to advance this view of media technologies as complex sociomaterial phenomena. The contributors first address the relationship between materiality and mediation, considering such topics as the lived realities of network infrastructure. The contributors then highlight media technologies as always in motion, held together through the minute, unobserved work of many, including efforts to keep these technologies alive. Contributors Pablo J. Boczkowski, Geoffrey C. Bowker, Finn Brunton, Gabriella Coleman, Gregory J. Downey, Kirsten A. Foot, Tarleton Gillespie, Steven J. Jackson, Christopher M. Kelty, Leah A. Lievrouw, Sonia Livingstone, Ignacio Siles, Jonathan Sterne, Lucy Suchman, Fred Turner',
    categories: ['Computers'],
    authors: ['Tarleton Gillespie', 'Pablo J. Boczkowski', 'Kirsten A. Foot'],
    publisher: 'MIT Press',
    publishedDate: '2014-01-17',
    language: 'en',
    pageCount: 340,
    thumbnail:
      'http://books.google.com/books/content?id=zeK2AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=zeK2AgAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=17&source=gbs_api',
  },
  {
    title: 'Restoring the Innovative Edge',
    subTitle: 'Driving the Evolution of Science and Technology',
    description:
      "This book provides a framework for restoring America's innovative edge by driving the evolution of science and technology, and ameliorating obstacles and blockages that cause failures in this process. The book's perspective is informed not only by the author's decades of research on innovation, but also his recent consulting with national public research laboratories and agencies.",
    categories: ['Business & Economics'],
    authors: ['Jerald Hage'],
    publisher: 'Stanford University Press',
    publishedDate: '2011-05-17',
    language: 'en',
    pageCount: 327,
    thumbnail:
      'http://books.google.com/books/content?id=vZXfygRaizYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=vZXfygRaizYC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=18&source=gbs_api',
  },
  {
    title: 'Intelligent Systems and Computer Technology',
    description:
      'Recent developments in soft-computation techniques have paved the way for handling huge volumes of data, thereby bringing about significant changes and technological advancements. This book presents the proceedings of the 3rd International Conference on Emerging Current Trends in Computing & Expert Technology (COMET 2020), held at Panimalar Engineering College, Chennai, India on 6 and 7 March 2020. The aim of the book is to disseminate cutting-edge developments taking place in the technological fields of intelligent systems and computer technology, thereby assisting researchers and practitioners from both institutions and industry to upgrade their knowledge of the latest developments and emerging areas of study. It focuses on technological innovations and trendsetting initiatives to improve business values, optimize business processes and enable inclusive growth for corporates, industries and education alike. The book is divided into two sections; ‘Next Generation Soft Computing’ is a platform for scientists, researchers, practitioners and academics to present and discuss their most recent innovations, trends and concerns, as well as the practical challenges encountered in the field. The second section, ‘Evolutionary Networking and Communications’ focuses on various aspects of 5G communications systems and networking, including cloud and virtualization solutions, management technologies, and vertical application areas. It brings together the latest technologies from all over the world, and also provides an excellent international forum for the sharing of knowledge and results from theory, methodology and applications in networking and communications. The book will be of interest to all those working in the fields of intelligent systems and computer technology.',
    categories: ['Computers'],
    authors: ['D.J. Hemanth', 'V.D.A. Kumar', 'S. Malathi'],
    publisher: 'IOS Press',
    publishedDate: '2020-12-15',
    language: 'en',
    pageCount: 672,
    thumbnail:
      'http://books.google.com/books/content?id=gK4SEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=gK4SEAAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=19&source=gbs_api',
  },
  {
    title: 'Blockchain Technology and Computational Excellence for Society 5.0',
    description:
      'Blockchain is the most disruptive technology to emerge in the last decade. The evolution of cryptocurrencies has carried with it a revolution in digital economics that has catapulted the application of blockchain technology to a new level across a variety of industries, including banking, security, networking, and more. Blockchain Technology and Computational Excellence for Society 5.0 closes the gap in existing literature by presenting a selection of chapters that not only shape the research domain, but also present supportive real-life problems and pragmatic solutions. This book presents a variety of highly relevant themes, concepts, and applications in blockchain, discussing topics such as cyber security, digital currencies, and intelligent networks, fueling awareness and interest. With its insight into various platforms, techniques, and tools, this book serves as a valuable resource for academicians, researchers, research scholars, postgraduates, professors, computer scientists, and technology enthusiasts.',
    categories: ['Computers'],
    authors: [
      'Khan, Shahnawaz',
      'Syed, Mohammad Haider',
      'Hammad, Rawad',
      'Bushager, Aisha Fouad',
    ],
    publisher: 'IGI Global',
    publishedDate: '2022-01-14',
    language: 'en',
    pageCount: 309,
    thumbnail:
      'http://books.google.com/books/content?id=6m9bEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=6m9bEAAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=21&source=gbs_api',
  },
  {
    title: 'VoIP Technology: Applications and Challenges',
    description:
      'This book offers an accessible introduction and practical guide to Voice over Internet Protocol (VoIP) technology, providing readers with the know-how to solve the problems encountered in applying VoIP technology across all types of network. It incorporates the latest research findings and brings readers up to date with the challenges that are faced by researchers developing novel applications of VoIP. The authors discuss the general architecture of VoIP technology, along with its application and relevance in conventional and emerging wireless communication networks, including Wireless Local Area Networks (WLANs), Worldwide Interoperability for Microwave Access (WiMAX), Long Term Evolution (LTE) and Cognitive Radio Networks. The book also includes Quality of service (QoS) studies under dynamic and unpredictable network conditions, which examine the reliability of both legacy systems And the upcoming pervasive computing systems. Further, it explains how the heuristic-based learning algorithms that are used in VoIP communications may help develop today’s technology in the area of autonomous systems. This book is a valuable source of information for academics and researchers, as it provides state-of-theart research in VoIP technology. It is also of interest to network designers, application architects, and service providers looking for a coherent understanding of VoIP across a wide range of devices, network applications and user categories.',
    categories: ['Technology & Engineering'],
    authors: ['Tamal Chakraborty', 'Iti Saha Misra', 'Ramjee Prasad'],
    publisher: 'Springer',
    publishedDate: '2018-08-03',
    language: 'en',
    pageCount: 239,
    thumbnail:
      'http://books.google.com/books/content?id=_1RnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=_1RnDwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=22&source=gbs_api',
  },
  {
    title: 'Digital Technology',
    description:
      'Examines how the digital revolution is progressing. From the basics of digitising information of various kinds to explaining how digital- based technologies work, this title looks at whether this explosion of instant information will be helpful or will invade our privacy and security. Age 13+.',
    categories: ['Juvenile Nonfiction'],
    authors: ['Chris Woodford'],
    publisher: 'Evans Brothers',
    publishedDate: '2006',
    language: 'en',
    pageCount: 48,
    thumbnail:
      'http://books.google.com/books/content?id=My7Zr0aP2L8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=My7Zr0aP2L8C&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=23&source=gbs_api',
  },
  {
    title: 'Biomedical Engineering',
    subTitle: 'Health Care Systems, Technology and Techniques',
    description:
      'Biomedical Engineering: Health Care Systems, Technology and Techniques is an edited volume with contributions from world experts. It provides readers with unique contributions related to current research and future healthcare systems. Practitioners and researchers focused on computer science, bioinformatics, engineering and medicine will find this book a valuable reference.',
    categories: ['Computers'],
    authors: ['Sang C. Suh', 'Varadraj Gurupur', 'Murat M. Tanik'],
    publisher: 'Springer Science & Business Media',
    publishedDate: '2011-08-23',
    language: 'en',
    pageCount: 285,
    thumbnail:
      'http://books.google.com/books/content?id=wGFfmwHfBMkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=wGFfmwHfBMkC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=24&source=gbs_api',
  },
  {
    title: 'Technology and Culture',
    description:
      '"Technology and Culture provides a comprehensive overview of anthropological and other theories examining the place of technology in culture, and the consequences of technology for cultural evolution. The book develops and contrasts anthropological discourse of technology and culture with humanistic and managerial views. It uses core anthropological concepts, including adaptation, evolution, totemic identity, and collective representations, to locate a board variety of technologies, ancient and modern, in a context of shared understandings and misunderstandings. The author draws on his own experience as an auto mechanic, computer programmer, ethnographer and aircraft pilot to demonstrate that technologies are cultural creations, encoding and accelerating the dreams and delusions of the societies that produce them." --Book Jacket.',
    categories: ['Technology'],
    authors: ['Allen Batteau'],
    publishedDate: '2010',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=BxRrPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=BxRrPgAACAAJ&dq=technology&hl=&as_pt=BOOKS&cd=25&source=gbs_api',
  },
  {
    title:
      'Advances in Smart Vehicular Technology, Transportation, Communication and Applications',
    subTitle:
      'Proceeding of the Third International Conference on VTCA, 15–18 October 2019, Arad, Romania',
    description:
      'This book constitutes the Proceedings of The Third International Conference on Smart Vehicular Technology, Transportation, Communication and Applications (VTCA 2019), Arad, Romania, held on October 15–18 October 2019 in Arad, Romania. This edition is technically co-sponsored by “Aurel Vlaicu” University of Arad, Romania, Southwest Jiaotong University, Fujian University of Technology, Chang’an University, Shandong University of Science and Technology, Fujian Provincial Key Lab of Big Data Mining and Applications, and National Demonstration Center for Experimental Electronic Information and Electrical Technology Education (Fujian University of Technology), China, Romanian Academy and General Association of Engineers in Romania - Arad Section. The book covers a range of topics including algorithms for optimization, video processing, parking management, IoT, software testing, cryptanalysis, NLP, CNN, wireless sensors network, adaptive security, data protection, green transportation, AI, smart cities, train control, analytic hierarchy process, big data, car following model, etc. The books help to disseminate the knowledge about some active research directions in the field Vehicle Technology and Communication. The book provides useful information to professors, researchers and graduated students in area of Vehicle Technology and Communication.',
    categories: ['Technology & Engineering'],
    authors: ['Valentina Emilia Balas', 'Jeng-Shyang Pan', 'Tsu-Yang Wu'],
    publisher: 'Springer Nature',
    publishedDate: '2021-07-01',
    language: 'en',
    pageCount: 294,
    thumbnail:
      'http://books.google.com/books/content?id=FZA2EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=FZA2EAAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=26&source=gbs_api',
  },
  {
    title: 'Technology and Global Change',
    description:
      'This is the first book to comprehensibly describe how technology has shaped society and the environment over the last 200 years. It will be useful for researchers, as a textbook for graduate students, for people engaged in long-term policy planning in industry and government, for environmental activists, and for the wider public interested in history, technology, or environmental issues.',
    categories: ['Science'],
    authors: ['Arnulf Grübler'],
    publisher: 'Cambridge University Press',
    publishedDate: '2003-10-16',
    language: 'en',
    pageCount: 468,
    thumbnail:
      'http://books.google.com/books/content?id=MqIQUV3nJrAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=MqIQUV3nJrAC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=27&source=gbs_api',
  },
  {
    title: 'Calm Technology',
    subTitle: 'Principles and Patterns for Non-Intrusive Design',
    description:
      'How can you design technology that becomes a part of a user’s life and not a distraction from it? This practical book explores the concept of calm technology, a method for smoothly capturing a user’s attention only when necessary, while calmly remaining in the background most of the time. You’ll learn how to design products that work well, launch well, are easy to support, easy to use, and remain unobtrusive. Author Amber Case presents ideas first introduced by researchers at Xerox PARC in 1995, and explains how they apply to our current technology landscape, especially the Internet of Things. This book is ideal for UX and product designers, managers, creative directors, and developers. You’ll learn: The importance and challenge of designing technology that respects our attention Principles of calm design—peripheral attention, context, and ambient awareness Calm communication patterns—improving attention through a variety of senses Exercises for improving existing products through calm technology Principles and patterns of calm technology for companies and teams The origins of calm technology at Xerox PARC',
    categories: ['Computers'],
    authors: ['Amber Case'],
    publisher: '"O\'Reilly Media, Inc."',
    publishedDate: '2015-12-18',
    language: 'en',
    pageCount: 150,
    thumbnail:
      'http://books.google.com/books/content?id=DZ88CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=DZ88CwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=28&source=gbs_api',
  },
  {
    title: 'Technology Entrepreneur',
    subTitle:
      'A High-Tech Services Business: Think Tank Adventures, Lessons, and Product Evolutions',
    description:
      "Join a technology entrepreneur as he shares the challenges he faced while operating a high-tech think tank for twenty-five years. Author C. J. Rubis delivers a fascinating story-filled narrative of the Technology Think Tank business and its effects on many government and industry projects. The numerous adventures, challenges and learned wisdom demonstrate the opportunities for the technology-services entrepreneur in this exploding age of technology to develop services and product innovations. Technology educators, students, budding and struggling entrepreneurs, and others will find real-life stories and dozens of examples to illustrate business principles. Learn about - the history of one company that operated as a microcosm of the think tank industry; - ways to overcome problems of business continuity and stability; - methods for company formation, staffing, and business development and management; and - processes for research, analysis, and development of innovative products. Written as a memoir, this business narrative is meant to inspire and guide entrepreneurship. It shares how to successfully initiate and grow small business opportunities in the huge government and defense technology services industry. You'll be educated and amused by the lessons and stories in Technology Entrepreneur.",
    categories: ['Entrepreneurship'],
    authors: ['C. J. Rubis'],
    publisher: 'iUniverse',
    publishedDate: '2012-10',
    language: 'en',
    pageCount: 469,
    thumbnail:
      'http://books.google.com/books/content?id=iVqxv-Jrqc8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=iVqxv-Jrqc8C&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=29&source=gbs_api',
  },
  {
    title: 'The Language of ICT',
    subTitle: 'Information and Communication Technology',
    description:
      'This accessible satellite textbook in the Routledge Intertext explores the nature of the electronic word and presents the new types of text in which it is found.',
    categories: ['Computers'],
    authors: ['Tim Shortis'],
    publisher: 'Psychology Press',
    publishedDate: '2001',
    language: 'en',
    pageCount: 134,
    thumbnail:
      'http://books.google.com/books/content?id=A-OirhpO2hIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=A-OirhpO2hIC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=31&source=gbs_api',
  },
  {
    title: 'Technology and Social Change',
    description: 'Additional Authors Are William F. Ogburn And Meyer Nimkoff.',
    authors: ['Francis R Allen', 'Hornell Hart', 'Delbert C Miller'],
    publishedDate: '2012-05-01',
    language: 'en',
    pageCount: 540,
    thumbnail:
      'http://books.google.com/books/content?id=5_L1LQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=5_L1LQEACAAJ&dq=technology&hl=&as_pt=BOOKS&cd=32&source=gbs_api',
  },
  {
    title: 'Information Technology and Society',
    subTitle: 'Implications for the Information Professions',
    description:
      'Clearing away the Orwellian doomsaying, Burton (information science, U. of Strathclyde) summarizes the observable effects of information technology on individuals, organizations, and society, puts them into a historical perspective that reaches back to the middle ages, and speculates on future changes. Addressed to people in the industry, but also of potential interest to social scientists. Acidic paper. Annotation copyrighted by Book News, Inc., Portland, OR',
    categories: ['Computers and civilization'],
    authors: ['Paul F. Burton'],
    publisher: 'Library Association Publishing (UK)',
    publishedDate: '1992',
    language: 'en',
    pageCount: 152,
    thumbnail:
      'http://books.google.com/books/content?id=u2FEAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=u2FEAAAAMAAJ&q=technology&dq=technology&hl=&as_pt=BOOKS&cd=33&source=gbs_api',
  },
  {
    title: 'Ready Technology',
    subTitle: 'Fast-Tracking New Business Technologies',
    description:
      'Companies understand that their ability to compete is tied directly to their ability to leverage the very latest technology advances. Fortunately, deploying new technology has never been easier, primarily due to early maturity and cloud delivery. One approach that is helping companies rapidly pilot and affordably deploy new technologies is ready technology, a new category of information technology (IT). This book explains the ready technology adoption process in detail, enabling companies to exploit new technology immediately and effectively. In this book, the author challenges the traditional "requirements-first/technology-second" approach to technology deployment. Espousing a "technology-first/requirements-second" approach, the author explains how business solutions are "discovered" by deploying—not studying—ready technology. The book covers the latest trends and processes in ready technology. It also describes the characteristics of ready companies and recommends ready technology pilots that should be launched by the following industries: higher education, retail, and healthcare.',
    categories: ['Business & Economics'],
    authors: ['Stephen J. Andriole'],
    publisher: 'Auerbach Publications',
    publishedDate: '2014-09-23',
    language: 'en',
    pageCount: 0,
    thumbnail:
      'http://books.google.com/books/content?id=Smy8oAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=Smy8oAEACAAJ&dq=technology&hl=&as_pt=BOOKS&cd=34&source=gbs_api',
  },
  {
    title: 'Technology as Symptom and Dream',
    description:
      "Robert Romanyshyn's latest book shows how the development of linear perspective vision has altered our relationship with the world and led to our increasing alienation.",
    categories: ['Technology'],
    authors: ['Robert Donald Romanyshyn'],
    publisher: 'Psychology Press',
    publishedDate: '1989',
    language: 'en',
    pageCount: 265,
    thumbnail:
      'http://books.google.com/books/content?id=zHvZgEYcHK0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=zHvZgEYcHK0C&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=35&source=gbs_api',
  },
  {
    title: 'The Dark Side of Technology',
    description:
      'The Dark Side of Technology is intended as a powerful wake-up call to the potential dangers that could, in the near future, destroy our current advanced civilizations. The author examines how fragile our dependence on electronic communications, information storage, and satellites is, as vulnerability increases in an age of raising security concerns. This weakness is evident from the exponential rise in cyber-crime and terrorism. Satellites are crucial to modern-day living, but they can be destroyed by energetic space debris or damaged by solar emissions. Destruction of data, communications, and electrical power grids would bring disaster to advanced nations. Such events could dramatically change our social and economic landscapes within the next 10-20 years. New technology equally impacts employment, agriculture, biology, medicine, transport, languages, and our social well-being. This book explores both the good and the bad aspects of technological advances, in order to raise awareness and promote caution. Technology may be impressive, but we need to be mindful of potential negative future effects. We ought to seriously consider the long term consequences of an increasing failure to pursue healthy life styles, use of ineffective antibiotics, genetic mutations, and the destruction of food supplies and natural resources. The diverse topics covered aims to show why we must act now to plan for both the predictable downsides of technology, and also develop contingency plans for potential major catastrophes, including natural events where we cannot define accurate time scales.',
    categories: ['Science'],
    authors: ['Peter Townsend'],
    publisher: 'Oxford University Press',
    publishedDate: '2017-01-19',
    language: 'en',
    pageCount: 336,
    thumbnail:
      'http://books.google.com/books/content?id=DNTwDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=DNTwDQAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=36&source=gbs_api',
  },
  {
    title: 'Persuasive Technology',
    subTitle: 'Using Computers to Change What We Think and Do',
    description:
      'B.J. Fogg proposes conceptual examples of possible new technologies, discusses ethical implications of persuasive computing and offers theoretical insights into persuasion processes.',
    categories: ['Computers'],
    authors: ['B.J. Fogg'],
    publisher: 'Morgan Kaufmann',
    publishedDate: '2003',
    language: 'en',
    pageCount: 318,
    thumbnail:
      'http://books.google.com/books/content?id=9nZHbxULMwgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=9nZHbxULMwgC&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=37&source=gbs_api',
  },
  {
    title: 'Technology, Change and the Academic Library',
    subTitle: 'Case Studies, Trends and Reflections',
    description:
      'Massive technological change has been impacting universities and university libraries in recent years. Such change has manifested in technological developments impacting all areas of academic library activity, including systems, services, collections, the physical library environment, marketing, and support for university teaching, learning, research, and administration. Many books and papers have examined these changes from a technical perspective. However, there is little substantive reflection on what technological change means, and how best to get out in front of it, for the academic library. Technology, Change and the Academic Library systematically reflects on technological innovation, the successes, failures and lessons learned, the nature, process and culture of change, and key aspects including impacts on library staff and users, roles and responsibilities, and skills and capabilities. The book takes an international perspective on the massive change currently affecting academic libraries. The title gives an overview and literature review, considers technological innovation and change management, future technologies and future change, and provides information on further reading. Case studies describe the rationale, aims, and objectives for particular technological innovations, and consider methods, outcomes, and recommendations for the future. Finally, the book reflects back on how technological change can best be wrought in academic libraries. Gives library managers and librarians insight into how best to identify, plan, and implement technological innovation Provides a wide-ranging overview, literature review, and a series of reflective case studies on technological innovation in libraries Emphasises current trends, lessons, and critical issues for putting technological innovation into place Offers an international perspective on technological innovation in the academic library Uses a critical methodology to reflect on what works, what does not, and how managers can apply lessons from real cases worldwide',
    categories: ['Business & Economics'],
    authors: ['Jeremy Atkinson'],
    publisher: 'Chandos Publishing',
    publishedDate: '2020-09-22',
    language: 'en',
    pageCount: 235,
    thumbnail:
      'http://books.google.com/books/content?id=VKXgDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=VKXgDwAAQBAJ&printsec=frontcover&dq=technology&hl=&as_pt=BOOKS&cd=38&source=gbs_api',
  },
  {
    title: 'Information Technology Essentials Volume 1',
    subTitle: 'Introduction to Information Systems',
    description:
      "This book is designed to be a survey of the essential topics of Information Systems. The material covers important topics that drive computing and information technology today. The book is broken down into sections that cover a survey of essential areas of information systems. These topics include:- An introduction and overview of computer hardware- How software is built by industry today using the software development lifecycle.- Cloud computing and the services that are offered by the leading vendors on the market today- Computer security and,- The future of computing and more.This book is designed for anyone who wants to have more information about the information technology field and is ideal for someone just getting started. The course will give you a solid understanding of many of the concepts that drive one of the most important industries in today's world.",
    authors: ['Eric Frick'],
    publisher: 'Independently Published',
    publishedDate: '2019-11-13',
    language: 'en',
    pageCount: 265,
    thumbnail:
      'http://books.google.com/books/content?id=cU23ywEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    previewLink:
      'http://books.google.co.in/books?id=cU23ywEACAAJ&dq=technology&hl=&as_pt=BOOKS&cd=39&source=gbs_api',
  },
];

async function insertDocuments() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Select a database and collection
    const database = client.db('booksdb');
    const collection = database.collection('books');

    // Insert multiple documents
    const result = await collection.insertMany(techNologyData);

    console.log(`${result.insertedCount} documents inserted successfully.`);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the function to insert documents
insertDocuments();
