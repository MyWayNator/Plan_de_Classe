# Plan de classe observable

Une petite application web pour noter des observables en classe d'un simple toucher sur le plan de classe (participation, bavardage, hors tâche…), puis s'appuyer sur ces observations pour améliorer le placement des élèves.

**Utiliser l'appli :** https://mywaynator.github.io/Plan_de_Classe/

## Principes

- **Tout reste sur l'appareil.** Les données (classes, plans, séances) sont enregistrées dans le navigateur. Rien n'est envoyé à un serveur, ni à GitHub : ce dépôt ne contient que le code.
- **Fonctionne hors ligne.** Après une première ouverture avec réseau, l'appli s'ouvre sans connexion.
- **Installable.** Sur tablette ou téléphone, utilisez « Ajouter à l'écran d'accueil » (Safari : bouton Partager ; Chrome : menu ⋮) pour l'ouvrir comme une application.
- **Sauvegarde.** Réglages › Données › Sauvegarde complète (JSON). À faire régulièrement et avant de changer d'appareil ou de navigateur ; la restauration se fait au même endroit.

## Utilisation en classe

1. **Réglages** : créez la classe en collant la liste des élèves (un par ligne).
2. **Plan** : réglez la disposition et placez les élèves (toucher un élève, puis une place).
3. **Séance** : choisissez un observable dans la barre, puis touchez les élèves concernés. Le premier toucher démarre la séance. « Annuler la dernière » et la gomme corrigent les erreurs ; le mode discret masque noms et compteurs si l'écran est projeté.
4. **Bilan** : carte de chaleur, voisins qui cumulent des observables négatifs, détail par élève, export CSV.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | L'application complète (HTML, CSS et JavaScript dans un seul fichier) |
| `sw.js` | Service worker : cache pour le fonctionnement hors ligne |
| `manifest.webmanifest`, `icon*.png`, `icon.svg` | Installation sur l'écran d'accueil |

Pour publier une mise à jour : modifier `index.html`, puis incrémenter `VERSION` dans `sw.js` afin que les appareils récupèrent la nouvelle version.

## Feuille de route

- [x] Version 1 : grille de places, saisie en un toucher, bilan simple, export
- [ ] Moteur de plan : meubles (tables de 1 ou 2, îlots de 4 ou 6, paillasses), modèles de départ, vue enseignant / vue élève
- [ ] Éditeur de salle : déplacer et pivoter les meubles par crans de 15°
- [ ] Mode classe adaptatif : plein écran, barre d'observables en bas ou sur le côté, sans défilement
- [ ] Bilan et optimisation : voisins par distance, historique des plans, échanges de places suggérés

## Licence

GNU GPL v3, voir `LICENSE`.
