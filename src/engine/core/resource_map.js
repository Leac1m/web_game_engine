class MapEntry {
    constructor(data) {
        this.mData = data;
        this.mRefCount = 1;
    }

    decRef() { this.mRefCount--; }

    incRef() { this.mRefCount++; }

    set(data) { this.mData = data; }
    data() { return this.mData; }

    canRemove() { return (this.mRefCount == 0); }
}

let mMap = new Map();
let mOutstandingPromises = [];

function has(path) { return mMap.has(path) }
function get(path) {
    if (!has(path)) {
        throw new Error("Error [" + path + "]: not laoded");
    }
    return mMap.get(path).data();
}

function set(key, value) { mMap.get(key).set(value); }

function loadRequested(path) {
    mMap.set(path, new MapEntry(null));
}

function incRef(path) {
    mMap.get(path).incRef();
}

function unload(path) {
    let entry = mMap.get(path);
    entry.decRef();
    if (entry.canRemove())
        mMap.delete(path);
    return entry.canRemove();
}

function pushPromise(p) { mOutstandingPromises.push(p); }

function loadDecodeParse(path, decodeResource, parseResource) {
    let fetchPromise = null;
    if (!has(path)) {
        loadRequested(path);
        fetchPromise = fetch(path)
            .then(res => decodeResource(res))
            .then(data => parseResource(data))
            .then(data => { return set(path, data) })
            .catch(err => { throw err });
        pushPromise(fetchPromise);
    } else {
        incRef(path);
    }
    return fetchPromise;
}

async function waitOnPromise() {
    await Promise.all(mOutstandingPromises);
    mOutstandingPromises = [];
}

export { has, get, set, loadRequested, incRef, loadDecodeParse, unload, pushPromise, waitOnPromise }