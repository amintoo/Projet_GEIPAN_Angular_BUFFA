# Projet_GEIPAN_Angular_BUFFA
Depuis l'affaire Roswell les observations d'objets celestes non identifés se sont multipliées. En France, un organisme dépendant du CNES, le GEIPAN, mène des enquêtes sur chaque cas connu et rend public les résultats en OpenData. Vous pouvez consulter les archives ici : http://www.cnes-geipan.fr/. Les cas de type "D, D1 ou D2" sont les cas inexpliqués donc les plus intéressants :-)  Afin de nous amuser un peu avec ces données on ne peut plus sérieuses (le GEIPAN dépend du Centre National d'Etudes Spatiales et travaille avec l'armée et la gendarmerie nationale), vous allez devoir réaliser un serveur REST miroir hébergeant les données du GEIPAN, ainsi qu'un moteur de recherche client en React ou en Angular.

# Réalisé
* AAYADI ELMEHDI
* DAHIR AMIN 
# Travail à Faire
 * Récupérer les données sur cette page : http://www.cnes-geipan.fr/index.php?id=181&no_cache=1&tx_ttnews%5BbackPid%5D=211&tx_ttnews%5Btt_news%5D=330 il s'agit de fichiers .csv. Un autre fichier contient la description des différentes colonnes. La base se compose de deux collections liées : les cas et les témoignages. 
 * Vous devrez d'abord les importer dans MongoDB, réfléchissez bien car Mongo n'est pas une BD relationnelle. Il faudra peut-être merger ces données en une seule collection, ou bien, si vous conservez les deux collections, afficher un lien pour consulter dans la page affichant un témoignage le détail du cas d'observation, et vice versa : dans la page d'un cas, afficher un lien vers les témoignages.
   * Exemple de tutorial pour faire cela : https://bezkoder.com/node-js-csv-mongodb-collection/ ne prenez pas des exemples compliqués avec Mogoose etc.
 * Regardez la présentation des pages de résultat du GEIPAN, vous pouvez sans doute faire mieux....
 * Recherche par date, type de cas, et mot clé dans le titre....
 * Affichage dans un tableau, pagination, page de détails sur un cas.
 * Ce serait bien d'avoir quelques statistiques, par exemple région par région.... et une ou deux visualisation graphique.
 * Bref, c'est un sujet ouvert, à vous de vous amuser avec ces données.... certains cas et témoignages viennent avec des vidéos ou des photos....
 * IMPORTANT : à la fin de l'utilisation de votre application, on doit impérativement savoir si nous avons été visités ou non par une vie intelligente extra-terrestre.

L'évaluation sera faire par Michel Buffa et par un lémurien vivant sur la face cachée de la lune.
