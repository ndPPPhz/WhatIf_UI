<template>
<div>
    <h1> Classifica </h1>
    <div id="classifica">
<table class="table" v-if="randomRank">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Punti</th>
      <th scope="col">Vinte</th>
      <th scope="col">Pareggiate</th>
      <th scope="col">Perse</th>
      <th scope="col">GF</th>
      <th scope="col">GS</th>
      <th scope="col">Punti Totali</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="squadra in randomRank.rank" :key="squadra.nome">
      <th scope="row"> {{ squadra.nome }} </th>
      <td>{{ squadra.punti }}</td>
      <td>{{ squadra.vinte }}</td>
      <td>{{ squadra.pareggiate }}</td>
      <td>{{ squadra.perse }}</td>
      <td>{{ squadra.gf }}</td>
      <td>{{ squadra.gs }}</td>
      <td>{{ squadra.punteggio }}</td>
    </tr>
  </tbody>
</table>
<template v-else>...</template>
</div>

<h1> Storico </h1>

<div class="row row-cols-1 row-cols-md-3 g-4" v-if="randomRank" id="storico">
  <div class="col" v-for="(giornata, index) in randomRank.storico" :key="index">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Giornata {{index+1}}</h4>
        <div class="card-text">
            <div v-for="incontro in giornata" :key="incontro.teamA.nome + incontro.teamB.nome + index">
                {{incontro.teamA.nome}} {{incontro.teamB.nome}} <b> {{incontro.teamA.ris}} - {{incontro.teamB.ris}} </b> ({{incontro.teamA.punteggio}} - {{incontro.teamB.punteggio}})
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
<template v-else>...</template>
    

</div>
</template>

<script>
import { BASE_URL } from '@/variables.js'

export default {
  data() {
    return {
        randomRank: null
    }
  },
  mounted() {
    this.generateRandomRank()
  },
  methods: {
    generateRandomRank: async function() {
        const legaID = this.$route.params.legaID
        const campionatoID = this.$route.params.campionatoID

        const response = await fetch(`${BASE_URL}/randomise/${legaID}/${campionatoID}`, {
            credentials: 'include',
            method: 'GET'
        })
        if (response.ok) {
            const fetchedData = await response.json()
            this.randomRank = fetchedData
        } else {
            alert('Please login first!')
        }
    }
  }
}
</script>

<style>
ul {
    text-align: left;
    display: inline-block;
}
.giornata {
    margin-bottom: 16px;
}
</style>