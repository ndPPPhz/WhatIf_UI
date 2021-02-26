<template>
<div style="width: 22rem; margin: auto;">
    <h1> {{ title }} </h1>
    <h5> Ora non hai più scuse </h5>
    <form class="form-signin" @submit.prevent="executeLogin">
      <div class="row">
      <div class="col">
        <label for="validationCustom01" class="form-label">Username</label>
        <input type="text" class="form-control" v-model="username" placeholder="Username" required>
      </div>
      <div class="col">
        <label for="validationCustom01" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password" required>
      </div>
      </div>
      <br/>
      <div>
      <input type="submit" class="btn btn-primary form-control" value="Log In">
      </div> 
    </form>
</div>
</template>

<script>
import { BASE_URL } from '@/variables.js'

export default {
  data() {
    return {
      title: 'Fanta Culo',
      username: null,
      password: null
    }
  },
  mounted() {
    if (document.cookie.indexOf('connect.sid') != -1 ) {
      this.$router.push('/user')
    }
  },
  methods: {
    executeLogin: async function() {
      const response = await fetch(`${BASE_URL}/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      try {
        if (response.ok) {
            const fetchedData = await response.json()
            console.log(fetchedData)
            this.$router.push('/user')
        } else {
            alert(response.error)
        }
      } catch (error) {
          alert(error)
      }
    }
  }
}
</script>