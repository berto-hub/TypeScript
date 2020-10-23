import {Application, Router, helpers} from 'https://deno.land/x/oak/mod.ts' ;
import {MongoClient} from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const port = 200;
const app = new Application();

const router = new Router();

const client = new MongoClient();
client.connectWithUri(
    "mongodb+srv://BertoNebrija:nebrija@clusternebrija.yze6h.gcp.mongodb.net/RickyMorty?retryWrites=true&w=majority"
);

interface charactersSchema{
    _id: {$oid: string},
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: string,
    location: string,
    image: string,
    episode: string[],
}

/*try{
    const db = client.database("RickyMorty");
    const char = db.collection<charactersSchema>("Characters");

    const foundChars = await char.find({id: {$regex: ".*character.*"}});
    if(foundChars.length > 0){
        for(let i=0;i<foundChars.length;i++){

        }
    }

}catch(e){
    console.error(e);
}*/

app.use((ctx) => {
    ctx.response.body = 'OK';
});
app.addEventListener('listen', () => {
    console.log(`Status: ${port}`);
});

//Ejercicio 2: Sacar todos los characters:
router.get('/characters', async (ctx) => {
    ctx.response.body = Array.from(chars.values());
});

//Ejercicio 3: Sacar los characters con un id determinado:
router.get('/characters/:characterId', async (ctx) => {
    const {characterId} = helpers.getQuery(ctx, {mergeParams: true});
    ctx.response.body = chars.get(characterId);
});

//Ejercicio 4: Cambiar status de un character:
/*router.put('/characters/:characterId', async (ctx)=>{
    const {characterStatus} = helpers.getQuery(ctx, {mergeParams: true});
    if( == "Alive"){
         = "Dead";
    }else{
         = "Alive";
    }
    ctx.response.body = chars.set(characterStatus);
});*/

//Ejercicio 5: Eliminar character con un id determinado:
router.delete('/characters/:characterId', async (ctx) => {
    const {characterId} = helpers.getQuery(ctx, {mergeParams: true});
    const isDeleted = chars.delete(characterId);

    ctx.response.body = isDeleted;
});

app.use(router.allowedMethods());
app.use(router.rutes());