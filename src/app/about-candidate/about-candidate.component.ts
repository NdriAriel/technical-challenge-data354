import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRandomRgb } from 'src/utils';
/**
 * *About user component
 * its for my own purpose and just showcases my Resumé
 */
@Component({
  selector: 'app-about-candidate',
  templateUrl: './about-candidate.component.html',
  styleUrls: ['./about-candidate.component.scss']
})
export class AboutCandidateComponent implements OnInit {
user={
  name:"David Kouamé N'DRI",
  jobTitle:"Sofware Engineer",
  photo:"assets/david.png",
  email1:"kouame.ndri1998@gmail.com",
  email2:"kouame.ndri@supcom.tn",
  linkedIn:"linkedin.com/in/kouamé-david-n-dri-1615a5186",
  phone:"+216 27999299",
  address:"Ariana, Tunisie",
  hobbies:[
    'Football',
    "Musique",
    "Internet",
    "Lecture"
  ],
  profile:`Ingénieur en génie logiciel avec deux (02) années de pratique dans le développement, la conception et la maintenance de logiciels.
  Fortes compétences en résolution de problèmes, analyse de systèmes complexes et collaboration avec des équipes interfonctionnelles.
  Expérience approfondie dans le développement de solutions logicielles robustes, évolutives et efficaces pour répondre aux besoins des utilisateurs et des clients.`,
  experience:[
    {
      time:"Mars 2023-Juin 2023",
      jobTitle:"Remote software Developer",
      company:"SeeWatch, Pau, Nouvelle Aquitaine France",
      descriptioon:[
        " Développement Backend avec Nodejs",
        "conception de la base de données",
        "	Utilisation des API de paiement",
        "	documentation du code via Swagger.",
        ]
    },
    {
      time:"Depuis Juin 2022",
      jobTitle:"Lead Developer",
      company:"Aladin Technologies,Abidjan",
      descriptioon:[
        "Conception et développement",
        "gestion de projet avec la methode UP",
        "mise en place d’architectures logicielles robustes",
        "développement basé sur les principes de Clean Architecture"
        ]
    },
    {
      time:"Février 2022- Juin 2022",
      jobTitle:"Stage Ingénieur génie logiciel",
      company:"Laboratoire Médiatron Sup’Com Tunisie",
      descriptioon:[
        "Conception et développement",
        "Etat de l’art des systèmes de recomandation",
        "modelisation d’un modèle basé sur l’approche Matrix Factorisation à l’aide des données implicites pour la mise en œuvre d’un système de recommendation de services ",
        "architecture microservices."
        ]
    }

  ],
educations:[

  {
   school:"Sup'com Tunis",
   year:"2021-2022",
   degree:"Master systèmes d'information et  genie Logiciel "
  },
  {
    school:"ESATIC, Abidjan",
    year:"2017-2020",
    degree:"Licence systèmes reseaux informatiques et telecom "
   },
   {
    school:"Lycée Moderne Oumé.",
    year:"2010-2017",
    degree:"Baccalauréat scientifique option serie C. "
   }
  ]
}

data:any = {
  labels: [
    'Nodejs',
    "Nestjs",
    "Angular",
    "Reactjs",
    "Python",
    "Django",
    "Flask",
    "Recommender system",
    "Machine learning",
    "Clean Architecture",
    "Microservice Architecture",
    'Cloud native app development',
    "Docker",
    "UML",
    "SCRUM/UP",
    "JavaScript/TypeScript"
  ],
  datasets: [{
    label: 'Domaine de competence.',
    data: [4.5,4.5,4.5,2.5,4,3,3,3,2.5,4,3,3,2.8,3,2.3,4.5],
    borderColor: (()=>{
      const bg:any=[]
      for(let i=0;i<16;i++){
       bg.push(`${getRandomRgb()}`)
      }
      return bg;
    })(),
    backgroundColor: (()=>{
      const bg:any=[]
      for(let i=0;i<16;i++){
       bg.push(`${getRandomRgb()}`)
      }
      return bg;
    })()
  },
]

}
  constructor() { }

  ngOnInit(): void {
    new Chart('skilgraph',{
      type:"bar",
      data:this.data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        responsive:true,
        plugins:{
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Evaluation personnelle de mes competences techniques.`,
      }
    },
        scales: {
          y: {
            beginAtZero: true,
            min: 1,
           max: 5
          }
        }
      }
  })
  new Chart('ci',{
    type:"bar",
    data:{
      labels:this.user.hobbies,
      datasets: [{
        label: 'Centres \'d’intérêts ',
        data: [4.6,4.8,5,3],
        borderColor: (()=>{
          const bg:any=[]
          for(let i=0;i<16;i++){
           bg.push(`${getRandomRgb()}`)
          }
          return bg;
        })(),
        backgroundColor: (()=>{
          const bg:any=[]
          for(let i=0;i<16;i++){
           bg.push(`${getRandomRgb()}`)
          }
          return bg;
        })()
      },
    ]
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      responsive:true,
      plugins:{
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: `Evaluation personnelle de mes centres d’intérêts.`,
    }
  },
      scales: {
        y: {
          beginAtZero: true,
          min: 1,
         max: 5
        }
      }
    }
})





  }

}
