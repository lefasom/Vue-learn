<template>
    <router-link to="/">Ir a la Home</router-link>
    | <router-link to="/crear">Crear</router-link>
    <h1>Lista</h1>
    <div v-for="(item, index) of items" :key="index">
        <table>
            <tr>
                <th> Nombre </th>
                <th> Edad </th>
                <th> Acciones </th>
            </tr>
            <tr>
                <td> {{ item.value.nombre }}</td>
                <td> {{ item.value.edad }}</td>
                <td>
                    <router-link :to="`/editar/${item.id}`">Editar</router-link>
                    <button @click="eliminar(item.id)">Eliminar</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<style>
table {
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #333;
    width: 100px;
    text-align: center;
}
</style>
<script>
import { ref, onMounted, watch } from 'vue'
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';

export default {
    name: 'listaDeElementos',
    setup() {
        const items = ref([])

        const personaje = ref({ nombre: '', edad: '' })
        const getItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'vue-crud'));
            items.value = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                value: doc.data()
            }));
        }


        const eliminar = async (id) => {
            const documentRef = doc(db, 'vue-crud', id);
            await deleteDoc(documentRef);

        };
        onMounted(() => {
            getItems()
        })
        watch(items, () => {
            getItems()

        });
        return {
            personaje,
            items,
            eliminar,
        }
    },
}
</script>
