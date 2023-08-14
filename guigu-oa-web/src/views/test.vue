<template>
  <div>
    <div>账号切换</div>
    <button @click="zhangsan()" type="default" size="mini">张三</button>
    <button @click="lisi()" type="default" size="mini">李四</button>
    <button @click="zzjl()" type="default" size="mini">张总经理</button>
    <button @click="admin()" type="default" size="mini">admin</button>
    <div>当前token：{{ token }}</div>
  </div>
</template>

<script>
export default {
  name: "Test",

  data() {
    return {
      token: ''
    };
  },

  created(){
    this.token = window.localStorage.getItem('token')
  },

  methods: {
    wjl() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDM3NjMwNDIx1FEqLU4t8kxRsjKCMPMSc1OBWsqzcpRqAb4pVZBAAAAA.-bW4hJ5UptFiCRsL6jVUa4XbgVwdsfVGfP8gJ-tOVbp7D3JOb8sylbBDLUhTZt6FJsYhlA5uYz8HSRck_pbaCA'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    lrsjl() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDM3NjMwNDY10VEqLU4t8kxRsjKGMPMSc1OBWnKKirNylGoBjn551kIAAAA.HiQAK2uUQCFlQilO3mR3p5TURrlMrjN7zrR1IcFqhU8Q-VyxUiRJrGIuSwSKOC1uyQH_4JXL99yGDq74OnKvXQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    zzjl() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDM3NjMwNLYw11EqLU4t8kxRsjKFMPMSc1OBWqqqsnKUagGHebUNQQAAAA.FcCkD6QfaP8bd_3MYsRD6Tp9wr9JSRFWIUuIdG5O7XxhIeyWfzGLp40_Lesx_kWMMaaskh_ba3NrTlj8-nP6OA'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    lisi() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwNLY0MTUy1FEqLU4t8kxRsjKFMPMSc1OBWnIyTZRqAauWXUtAAAAA.Iw0CFNaEWAa8TAthse87WcNsNUKUrZLFVozFb6DE2O3ZNfzJpYuVaGXSDVCuj3zrK_3hlFjXVIacBzKKiaygpA'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },
    admin() {
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwNDYzNDcz01EqLU4t8kwBikGYeYm5qUAtiSm5mXlKtQBCfcl1QgAAAA.aNiAwhxSoKnT9ES65RyMFlQYly_59oVqDa66WdDUXEjrwmHQL1bzvOQ1vvMm0Nrpk4Y7IT1JLw3Aw2Ryw_CQRw'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },
    zhangsan(){
      window.localStorage.setItem('token', '');
      let token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwNDYztDQz1FEqLU4t8kxRsjKHMPMSc1OBWqoyEvPSjZVqAdbk8-5DAAAA.-Njz7HYLyVQ-HXzo8gRQKUbr0YCYvYkKOV9EcKoZZ8DGe4wCdjRm1PFv9nSx-CnwzVw8DqHuXMNjoEISI4YuwA'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    }
  }
}
</script>
