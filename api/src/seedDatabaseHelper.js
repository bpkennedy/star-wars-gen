const seedModules = [
  {
    id: "2345",
    name: "9771 deflector",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "C",
    type: "shield",
    base_atmo_speed: null,
    base_damage: null,
    base_jump: null,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: 500,
    base_space_speed: null
  },
  {
    id: "3456",
    name: "ANS-5c",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "B",
    type: "sensor",
    base_atmo_speed: null,
    base_damage: null,
    base_jump: null,
    base_maneuver: null,
    base_range: 300,
    base_shield_strength: null,
    base_space_speed: null
  },
  {
    id: "4567",
    name: "Daimler",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "E",
    type: "navigation",
    base_atmo_speed: null,
    base_damage: null,
    base_jump: null,
    base_maneuver: 60,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: null
  },
  {
    id: "5678",
    name: "Keppler 3z",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "A",
    type: "hyperdrive",
    base_atmo_speed: null,
    base_damage: null,
    base_jump: 100,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: null
  },
  {
    id: "1234",
    name: "2b fission",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "B",
    type: "engine",
    base_atmo_speed: 700,
    base_damage: null,
    base_jump: null,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: 1000
  },
  {
    id: "1234a",
    name: "2a fission",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "A",
    type: "engine",
    base_atmo_speed: 850,
    base_damage: null,
    base_jump: 100,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: 1150
  },
  {
    id: "6789",
    name: "Ion cannon",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "E",
    type: "armament",
    base_atmo_speed: null,
    base_damage: 10,
    base_jump: null,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: null
  },
  {
    id: "7891",
    name: "KX5 Linked laser cannon",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "D",
    type: "armament",
    base_atmo_speed: null,
    base_damage: 15,
    base_jump: null,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: null
  },
  {
    id: "8912",
    name: "MG5 concussion missile launcher",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    rating: "E",
    type: "armament",
    base_atmo_speed: null,
    base_damage: 30,
    base_jump: null,
    base_maneuver: null,
    base_range: null,
    base_shield_strength: null,
    base_space_speed: null
  }
];

const seedPlayers = [
  {
    id: "1234",
    first_name: "Moleg",
    last_name: "Bal",
    species: "Human",
    gender: "Male",
    profile_image_url:
      "https://steamuserimages-a.akamaihd.net/ugc/918053186553065192/F20C63A555E64AAE971975AFA2B3BA3B227CD080/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    hp: 300,
    xp: 0,
    level: 1
  }
];

const seedShips = [
  {
    id: "2468",
    name: "Z-95 Headhunter",
    manufacturer: "Incom Corporation",
    class: "starfighter",
    crew: 1,
    length: 16.74,
    width: 3.24,
    height: 18.12
  }
];

const seedUsers = [
  {
    id: "12345",
    username: "bpkennedy@gmail.com",
    displayName: "Brian",
    password: "pass123!",
    admin: true
  }
];

export const seedDatabase = async (db) => {
  try {
    for (const moduleItem of seedModules) {
      let batch = db.batch();
      const moduleRef = db.collection("modules").doc(moduleItem.id);
      batch.set(moduleRef, moduleItem);
      await batch.commit()
    }
    for (const ship of seedShips) {
      let batch = db.batch();
      const moduleRef = db.collection("ships").doc(ship.id);
      batch.set(moduleRef, ship);
      await batch.commit()
    }
    for (const player of seedPlayers) {
      let batch = db.batch();
      const moduleRef = db.collection("players").doc(player.id);
      batch.set(moduleRef, player);
      await batch.commit()
    }
    for (const user of seedUsers) {
      let batch = db.batch();
      const moduleRef = db.collection("users").doc(user.id);
      batch.set(moduleRef, user)
      await batch.commit()
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const clearDatabase = async (db) => {
  try {
    await deleteCollection(db, 'modules', 100)
    await deleteCollection(db, 'ships', 100)
    await deleteCollection(db, 'players', 100)
    await deleteCollection(db, 'users', 100)
  } catch (error) {
    console.log(error)
    throw error
  }
}

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      var batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}
