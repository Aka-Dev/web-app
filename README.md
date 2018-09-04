#Search Box App

  J'ai utilisé create-react-app pour créer ce projet, j'ai travaillé sur les fonctionnalitées suivantes en React:
    - Afficher la liste des utilisateurs
    - Au focus sur l'input search la liste des filtres s'affiche
    - L'utilisateur peut séléctionner un filtre de la liste déroulante
    - L'autocomplete qui filtre la liste des filtres
    - Après le choix du filtre l'utilisateur doit saisir la la valeur du filtre et taper espace pour la valiser
    - Lorsque l'utilisateur tape sur 'Enter' la liste des utilisateurs est filtré en fonction des filtres choisi par l'utilisateur


## Folder Structure

```
web-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    components/
      Filters.js
      List.js
      SelectedFilter.js
    containers/
      App.css
      App.js
    svg/
      avatar.svg
      cancel.svg
      envelope.svg
      flag.svg
```