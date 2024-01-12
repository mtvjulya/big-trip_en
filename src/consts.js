const POINT_TYPES = ["taxi", "bus", "train", "ship", "transport", "drive", "flight", "check-in", "sightseeing", "restaurant"];

const POINT_CITY = ['Cartagena', 'Santiago', 'Tortuga', 'Jamaica', 'Barbados', 'Havana'];

const OPTIONS = [
  {
    "type": "taxi",
    "offers": [{
      "title": "Upgrade to a business class",
      "price": 120
    }, 
    {
      "title": "Choose the radio station",
      "price": 60
    }]
  },
  {
    "type": "bus",
    "offers": [{
      "title": "Upgrade to a business class",
      "price": 120
    }, 
    {
      "title": "Choose the radio station",
      "price": 60
    }]
  },
  {
    "type": "transport",
    "offers": [{
      "title": "Upgrade to a business class",
      "price": 120
    }, 
    {
      "title": "Choose the radio station",
      "price": 60
    }]
  },
  {
    "type": "drive",
    "offers": [{
      "title": "Upgrade to a business class",
      "price": 120
    }, 
    {
      "title": "Choose the radio station",
      "price": 60
    }]
  },
  {
    "type": "train",
    "offers": [{
      "title": "Upgrade to a business class",
      "price": 120
    }, 
    {
      "title": "Choose the radio station",
      "price": 60
    }]
  },
  {
    "type": "ship",
    "offers": [{
      "title": "Upgrade to a business class",
      "price": 120
    }, 
    {
      "title": "Choose the radio station",
      "price": 60
    }]
  },
  {
    "type": "flight",
    "offers": [{
        "title": 'Add luggage',
        "price": 80
      },
      {
        "title": 'Book tickets',
        "price": 40
      }]
  },
  {
    "type": "sightseeing",
    "offers": [{
      "title": 'Book tickets',
      "price": 40
    }]
  },
  {
    "type": "restaurant",
    "offers": [{
        "title": 'Add breakfast',
        "price": 50
      },
      {
        "title": 'Add dinner',
        "price": 50
      },
      {
        "title": 'Add lunch',
        "price": 50
      },
    ]
  },
  {
    "type": "check-in",
    "offers": [{
        "title": 'Switch to comfort',
        "price": 20
      },
      {
        "title": 'Rent a car',
        "price": 200
      },
      {
        "title": 'Add breakfast',
        "price": 50
      },
    ]
  }
];


export {POINT_CITY, POINT_TYPES, OPTIONS,};