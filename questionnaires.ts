import type { ActorType } from './supabaseClient'

export type { ActorType }

export type Question = {
  id: string
  label: string
  type: 'radio' | 'text' | 'number' | 'select'
  options?: { value: string; label: string; points: number }[]
  required?: boolean
}

export const ACTOR_LABELS: Record<ActorType, string> = {
  commercant:       '🛒 Commerçant',
  producteur:       '🌾 Producteur',
  transporteur:     '🚚 Transporteur',
  partenaire_local: '🤝 Partenaire Local',
  client_pro:       '💼 Client Pro',
}

export const QUESTIONNAIRES: Record<ActorType, Question[]> = {
  commercant: [
    {
      id: 'volume_mensuel',
      label: 'Volume mensuel de marchandises',
      type: 'radio',
      options: [
        { value: 'moins_1t',  label: 'Moins de 1 tonne',    points: 1 },
        { value: '1_5t',      label: '1 à 5 tonnes',         points: 3 },
        { value: '5_20t',     label: '5 à 20 tonnes',        points: 5 },
        { value: 'plus_20t',  label: 'Plus de 20 tonnes',    points: 8 },
      ],
    },
    {
      id: 'type_produit',
      label: 'Type de produit principal',
      type: 'radio',
      options: [
        { value: 'alimentaire', label: 'Alimentaire / Agro', points: 3 },
        { value: 'textile',     label: 'Textile / Mode',     points: 2 },
        { value: 'electronique',label: 'Électronique',       points: 4 },
        { value: 'materiel',    label: 'Matériaux / BTP',    points: 4 },
        { value: 'autre',       label: 'Autre',              points: 1 },
      ],
    },
    {
      id: 'frequence_livraison',
      label: 'Fréquence de livraison',
      type: 'radio',
      options: [
        { value: 'ponctuel', label: 'Ponctuelle (1 fois)', points: 1 },
        { value: 'mensuel',  label: 'Mensuelle',           points: 2 },
        { value: 'hebdo',    label: 'Hebdomadaire',        points: 4 },
        { value: 'quotidien',label: 'Quotidienne',         points: 7 },
      ],
    },
    {
      id: 'zone_distribution',
      label: 'Zone de distribution',
      type: 'radio',
      options: [
        { value: 'local',    label: 'Local (quartier / marché)', points: 1 },
        { value: 'ville',    label: 'Ville entière',              points: 3 },
        { value: 'region',   label: 'Région',                     points: 5 },
        { value: 'national', label: 'National',                   points: 8 },
      ],
    },
    {
      id: 'moyen_transport',
      label: 'Moyen de transport actuel',
      type: 'radio',
      options: [
        { value: 'aucun',       label: 'Aucun (dépend fournisseur)', points: 2 },
        { value: 'moto',        label: 'Moto / Charrette',           points: 2 },
        { value: 'camionnette', label: 'Camionnette légère',         points: 4 },
        { value: 'camion',      label: 'Camion / Semi',              points: 6 },
      ],
    },
  ],

  producteur: [
    {
      id: 'production_annuelle',
      label: 'Production annuelle estimée',
      type: 'radio',
      options: [
        { value: 'moins_5t',  label: 'Moins de 5 tonnes',    points: 1 },
        { value: '5_20t',     label: '5 à 20 tonnes',         points: 3 },
        { value: '20_100t',   label: '20 à 100 tonnes',       points: 6 },
        { value: 'plus_100t', label: 'Plus de 100 tonnes',    points: 9 },
      ],
    },
    {
      id: 'type_culture',
      label: 'Type de production principale',
      type: 'radio',
      options: [
        { value: 'cereales',  label: 'Céréales (mil, maïs, riz)', points: 3 },
        { value: 'maraicher', label: 'Maraîchage (légumes)',       points: 4 },
        { value: 'fruits',    label: 'Fruits',                      points: 3 },
        { value: 'elevage',   label: 'Élevage / Lait',              points: 5 },
        { value: 'peche',     label: 'Pêche / Aquaculture',         points: 4 },
      ],
    },
    {
      id: 'stockage',
      label: 'Capacité de stockage',
      type: 'radio',
      options: [
        { value: 'aucun',    label: 'Aucun',                       points: 0 },
        { value: 'grenier',  label: 'Grenier / Silo local',        points: 2 },
        { value: 'entrepot', label: 'Entrepôt propre',             points: 5 },
        { value: 'froid',    label: 'Chambre froide / Frigorifique',points: 8 },
      ],
    },
    {
      id: 'acces_route',
      label: 'Accès route depuis site de production',
      type: 'radio',
      options: [
        { value: 'difficile', label: 'Difficile (piste)',           points: 1 },
        { value: 'saison',    label: 'Possible en saison sèche',   points: 2 },
        { value: 'correct',   label: 'Route correcte',             points: 4 },
        { value: 'bitume',    label: 'Route bitumée',              points: 6 },
      ],
    },
    {
      id: 'debouche',
      label: 'Débouché commercial actuel',
      type: 'radio',
      options: [
        { value: 'autoconso',    label: 'Auto-consommation',            points: 0 },
        { value: 'marche_local', label: 'Marché local',                 points: 2 },
        { value: 'grossiste',    label: 'Grossiste',                    points: 4 },
        { value: 'export',       label: 'Export / Transformation',      points: 8 },
      ],
    },
  ],

  transporteur: [
    {
      id: 'flotte',
      label: 'Taille de la flotte',
      type: 'radio',
      options: [
        { value: '1',      label: '1 véhicule',           points: 1 },
        { value: '2_5',    label: '2 à 5 véhicules',      points: 4 },
        { value: '6_15',   label: '6 à 15 véhicules',     points: 7 },
        { value: 'plus_15',label: 'Plus de 15 véhicules', points: 10 },
      ],
    },
    {
      id: 'type_vehicule',
      label: 'Type de véhicule principal',
      type: 'radio',
      options: [
        { value: 'moto',         label: 'Moto / Tricycle',            points: 1 },
        { value: 'camionnette',  label: 'Camionnette (< 3,5T)',       points: 3 },
        { value: 'camion_moyen', label: 'Camion moyen (3,5 – 15T)',   points: 6 },
        { value: 'semi',         label: 'Semi-remorque (> 15T)',      points: 9 },
      ],
    },
    {
      id: 'rayon_action',
      label: "Rayon d'action habituel",
      type: 'radio',
      options: [
        { value: 'local',          label: 'Local (< 50 km)',              points: 1 },
        { value: 'regional',       label: 'Régional (50 – 300 km)',       points: 4 },
        { value: 'national',       label: 'National (> 300 km)',          points: 7 },
        { value: 'international',  label: 'International / Sous-régional',points: 10 },
      ],
    },
    {
      id: 'type_cargaison',
      label: 'Type de cargaison habituelle',
      type: 'radio',
      options: [
        { value: 'vrac',      label: 'Vrac (sable, grains)',        points: 2 },
        { value: 'general',   label: 'Marchandises générales',      points: 4 },
        { value: 'frigo',     label: 'Froid / Périssables',         points: 7 },
        { value: 'conteneur', label: 'Conteneurs',                  points: 9 },
      ],
    },
    {
      id: 'disponibilite',
      label: 'Disponibilité',
      type: 'radio',
      options: [
        { value: 'occupe',     label: 'Occupé (peu disponible)',    points: 1 },
        { value: 'partiel',    label: 'Partiellement disponible',   points: 3 },
        { value: 'disponible', label: 'Disponible rapidement',      points: 6 },
      ],
    },
  ],

  partenaire_local: [
    {
      id: 'type_structure',
      label: 'Type de structure',
      type: 'radio',
      options: [
        { value: 'ong',        label: 'ONG / Association',           points: 4 },
        { value: 'mairie',     label: 'Mairie / Institution publique',points: 6 },
        { value: 'groupement', label: 'Groupement / Coopérative',    points: 5 },
        { value: 'entreprise', label: 'Entreprise privée',           points: 7 },
      ],
    },
    {
      id: 'zone_influence',
      label: "Zone d'influence",
      type: 'radio',
      options: [
        { value: 'village',     label: 'Village / Quartier',              points: 2 },
        { value: 'commune',     label: 'Commune / Arrondissement',        points: 4 },
        { value: 'departement', label: 'Département / District',          points: 6 },
        { value: 'region',      label: 'Région ou plus',                  points: 9 },
      ],
    },
    {
      id: 'reseau',
      label: 'Réseau de contacts terrain',
      type: 'radio',
      options: [
        { value: 'faible',    label: 'Faible (< 10 contacts)',      points: 1 },
        { value: 'moyen',     label: 'Moyen (10 – 50 contacts)',    points: 3 },
        { value: 'fort',      label: 'Fort (50 – 200 contacts)',    points: 6 },
        { value: 'tres_fort', label: 'Très fort (> 200 contacts)', points: 9 },
      ],
    },
    {
      id: 'motivation',
      label: 'Motivation à collaborer',
      type: 'radio',
      options: [
        { value: 'faible',      label: 'Faible / Réticent',         points: 0 },
        { value: 'curieux',     label: 'Curieux / En attente',      points: 3 },
        { value: 'interesse',   label: 'Intéressé',                 points: 6 },
        { value: 'tres_motive', label: 'Très motivé / Proactif',   points: 9 },
      ],
    },
  ],

  client_pro: [
    {
      id: 'secteur',
      label: "Secteur d'activité",
      type: 'radio',
      options: [
        { value: 'industrie',         label: 'Industrie / Manufacture',        points: 6 },
        { value: 'commerce_gros',     label: 'Commerce de gros',               points: 5 },
        { value: 'grande_surface',    label: 'Grande surface / Distribution',  points: 7 },
        { value: 'restauration',      label: 'Restauration / Hôtellerie',      points: 4 },
        { value: 'agro_transformation',label: 'Agro-transformation',           points: 6 },
      ],
    },
    {
      id: 'volume_achat',
      label: "Volume d'achat mensuel estimé",
      type: 'radio',
      options: [
        { value: 'faible',    label: 'Faible (< 500 000 FCFA)',    points: 1 },
        { value: 'moyen',     label: 'Moyen (500K – 2M FCFA)',     points: 4 },
        { value: 'fort',      label: 'Fort (2M – 10M FCFA)',       points: 7 },
        { value: 'tres_fort', label: 'Très fort (> 10M FCFA)',     points: 10 },
      ],
    },
    {
      id: 'fournisseur_actuel',
      label: 'Situation fournisseur actuel',
      type: 'radio',
      options: [
        { value: 'satisfait', label: 'Satisfait / Pas de besoin',       points: 0 },
        { value: 'problemes', label: 'Problèmes de fiabilité',          points: 5 },
        { value: 'cher',      label: 'Trop cher / Cherche alternative', points: 6 },
        { value: 'sans',      label: 'Sans fournisseur stable',         points: 9 },
      ],
    },
    {
      id: 'besoin_logistique',
      label: 'Besoin logistique exprimé',
      type: 'radio',
      options: [
        { value: 'aucun',           label: 'Aucun besoin exprimé',           points: 0 },
        { value: 'livraison',       label: 'Livraison régulière',            points: 5 },
        { value: 'stockage',        label: 'Stockage + livraison',           points: 7 },
        { value: 'chaine_complete', label: 'Chaîne complète (supply chain)', points: 10 },
      ],
    },
  ],
}
