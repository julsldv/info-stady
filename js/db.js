/**
 * Accès Firestore Stades et Contestants (après auth).
 * À charger après firebase-app.js et config.firebase.js.
 */
(function() {
  if (!window.firebase) return;
  const db = firebase.firestore();
  const STADES = 'Stades';
  const CONTESTANTS = 'Contestants';

  function sanitizeStade(data) {
    const num = v => (v === '' || v === null || v === undefined) ? null : Number(v);
    const str = v => (v === null || v === undefined) ? null : String(v).trim() || null;
    let images = data.images;
    if (typeof images === 'string') images = images.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
    if (!Array.isArray(images)) images = null;
    const sports = Array.isArray(data.sports) ? data.sports : (data.sports ? [data.sports] : null);
    return {
      nom: str(data.nom) ?? '',
      capacite: Number(data.capacite) || 0,
      descriptif: str(data.descriptif) ?? '',
      images: images && images.length ? images : null,
      latitude: num(data.latitude),
      longitude: num(data.longitude),
      ville: str(data.ville),
      pays: str(data.pays),
      club: str(data.club),
      isSystem: data.isSystem === true || data.isSystem === 'on',
      sports: sports && sports.length ? sports : null,
    };
  }

  window.dbStades = {
    async list() {
      const snap = await db.collection(STADES).get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async get(id) {
      const doc = await db.collection(STADES).doc(id).get();
      if (!doc.exists) throw new Error('Stade non trouvé');
      return { id: doc.id, ...doc.data() };
    },
    async add(data) {
      const payload = sanitizeStade(data);
      const ref = await db.collection(STADES).add(payload);
      return { id: ref.id, ...payload };
    },
    async set(id, data) {
      const payload = sanitizeStade(data);
      await db.collection(STADES).doc(id).set(payload);
      return { id, ...payload };
    },
    async delete(id) {
      await db.collection(STADES).doc(id).delete();
      return { deleted: id };
    },
  };

  window.dbContestants = {
    async list(sport) {
      let snap;
      if (sport) {
        snap = await db.collection(CONTESTANTS).where('Sport', '==', sport).get();
      } else {
        snap = await db.collection(CONTESTANTS).orderBy('Name').get();
      }
      let list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      if (sport && list.length) list.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
      return list;
    },
    async get(id) {
      const doc = await db.collection(CONTESTANTS).doc(id).get();
      if (!doc.exists) throw new Error('Contestant non trouvé');
      return { id: doc.id, ...doc.data() };
    },
    async add(data) {
      const name = data.Name != null ? String(data.Name).trim() : '';
      if (!name) throw new Error('Name requis');
      const payload = { Name: name, Sport: data.Sport || 'football' };
      const ref = await db.collection(CONTESTANTS).add(payload);
      return { id: ref.id, ...payload };
    },
    async set(id, data) {
      const name = data.Name != null ? String(data.Name).trim() : '';
      if (!name) throw new Error('Name requis');
      const payload = { Name: name, Sport: data.Sport || 'football' };
      await db.collection(CONTESTANTS).doc(id).set(payload);
      return { id, ...payload };
    },
    async delete(id) {
      await db.collection(CONTESTANTS).doc(id).delete();
      return { deleted: id };
    },
  };
})();
