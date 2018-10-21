Voici les infos :

 

-          Plusieurs méthodes sont définies dans le service, qui font presque le même traitement

-          Utilisation non nécessaire d’opérateurs RXJS comme map (pas la peine de l’utiliser si les données reçus ne sont pas à transformer)

-          Pas nécessaire d’utiliser @viewChild pour accéder aux propriétés du composant Angular Materials

-          Délation de service dans le root injector avec ( provideIn: 'root') et déclaration de celui-ci encore une fois dans le module Injector : Provoque des erreurs très difficiles à détecter

-          Un seul commit sur l'historique GIT

-          Code à ré-indenter

-          Placement des commentaires discutables

Pour commencer il faut utiliser l'éditeur Visual Studio Code
installer nodejs et npm
installer angular CLI (npm i -g @angular/cli) (page d'aide https://github.com/angular/angular-cli/wiki)
créer un nouveau projet (ng new currency-catalog )
ajouter les bibliotheques suivantes au projet (npm install --save *):
@angular/cdk
@angular/flex-layout
@angular/material
créer un repertoire json dans le repertoire src/assets
Mettre le contenue json dans un fichier "src/assets/json/currenccies.json"
commencer par creer un nouveau module "currencies" (ng g module currencies)
créer le repertoire models avec le module
créer une classe simple CurrencyAttributes avec tout les champs cités dans le fichier json
créer un classe simple Currency avec deux champs (id:number, attributes: CurrencyAttributes  )
ajouter un nouveau composant "displayer" dans le module "currencies" (ng g component currencies/displayer -m currencies )
l'afficheur des currencies
ajouter de la même façon un nouveau composant "OneCurrency"
l'afficheur d'un currency et qui compose le displayer
ajouter un nouveau service dans le module (ng g service currencies/currencies -m  currencies )
pour la liste il faut utiliser la classe MatGridList (https://material.angular.io/components/grid-list/overview) 
pour qu'elle soit responsive il faut utiliser l'exemple suivant (https://stackblitz.com/edit/angular-responsive-material-grid-leocaseiro)
 
pour faire des appels ajax il faut injecter HttpClient dans le service
tout les appels ajax se feront à partir du service
n'oublier pas d'ajouter le header Accept: application/vnd.api+json pour les appels de l'API
le format de l'url est https://api.openfintech.io/v1/currencies?page%5Bnumber%5D=X&page%5Bsize%5D=X
remplacer les X par les bonne valeur
il faut commencer par un appel vers le fichier json et après passer à l'ppel de l'API
pour faire le routing il faut utiliser l'exemple de la page (https://angular.io/guide/router) sinon d'autre page existe sur internet
pour la pagination je recommande d'utiliser le composant (https://material.angular.io/components/paginator/overview)
pour la recherche il faut utiliser les deux composants MatInput et MatSelect 
Tout les composant material Mat* sont inclus dans des module séparés

https://material.angular.io/components/categories

 

voici la liste des module materials

 

  MatAutocompleteModule,

  MatButtonModule,

  MatButtonToggleModule,

  MatCardModule,

  MatCheckboxModule,

  MatChipsModule,

  MatDatepickerModule,

  MatDialogModule,

  MatExpansionModule,

  MatFormFieldModule,

  MatGridListModule,

  MatIconModule,

  MatInputModule,

  MatListModule,

  MatMenuModule,

  MatPaginatorModule,

  MatProgressBarModule,

  MatProgressSpinnerModule,

  MatRadioModule,

  MatSelectModule,

  MatSidenavModule,

  MatSliderModule,

  MatSlideToggleModule,

  MatSnackBarModule,

  MatSortModule,

  MatTableModule,

  MatTabsModule,

  MatToolbarModule,

  MatTooltipModule,

  MatStepperModule,

  

  FlexLayoutModule