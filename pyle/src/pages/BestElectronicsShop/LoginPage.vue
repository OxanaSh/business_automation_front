<template>
  <div class="login-wrapper d-flex flex-wrap overflow-hidden">
    <div class="login-bg"></div>
    <div class="login-form-wrap">
      <div class="login-form">
        <router-link to="/" class="logo">
          <img
            src="../../assets/img/logo.webp"
            alt="Image"
            class="d-block mx-auto"
          />
        </router-link>
        <form @submit.prevent="submitForm">
          <div class="form-group mb-15">
            <label class="d-block fs-14 text-black mb-2">
              Логін
            </label>
            <input
              type="username"
              class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-title"
              placeholder="Введіть логін"
              v-model="username"
            />
          </div>
          <div class="form-group mb-20 position-relative">
            <label class="d-block fs-14 text-black mb-2">Пароль</label>
            <input
              type="password"
              id="fakePassword"
              placeholder="Введіть пароль"
              class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black"
              v-model="password"
            />
            <span id="toggler" class="position-absolute">
              <img src="../../assets/img/icons/eye-close.svg" alt="Image" />
            </span>
          </div>
          <button class="btn style-one w-100 d-block">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import axios from "axios";
import toast from "bootstrap/js/src/toast";
import {bottom} from "@popperjs/core";

export default defineComponent({

  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    submitForm() {
        if (this.password === "" || this.username === "" ) {
          console.log('error')
        } else {
          const formData = {
            username: this.username,
            password: this.password
          };
          axios.post("/api/v1/login/", formData).then((res) => {

            console.log(res);
            if(res.status === 200) {
              localStorage.setItem("token", res.data.access);
              axios.defaults.headers.common['Authorization'] = "Token " + res.data.access;

              this.$router.push({path: "/product-list"});
            }


          });
        }
    }
  }


});
</script>

<style lang="scss" scoped>
.login-wrapper {
  .login-bg {
    background-image: url(../../assets/img/login-bg.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
    width: 50%;
  }
  .login-form-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    background-color: var(--whiteColor);
    padding: 0 50px;
    .logo {
      display: block;
      margin-bottom: 20px;
      border-bottom: 1px solid #eef3fa;
      padding-bottom: 25px;
    }
    .login-form {
      border: 1px solid var(--ashColor);
      padding: 25px;
    }
    h5 {
      font-weight: 500;
      border-bottom: 1px solid #eef3fa;
      text-align: center;
      padding-bottom: 20px;
      margin: 0 0 20px;
    }
  }
  .login-credential-item {
    border-bottom: 1px solid #eef3fa;
  }
}
.form-group {
  #toggler {
    right: 20px;
    top: 65px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

@media only screen and (max-width: 991px) {
  .login-wrapper {
    padding: 50px 0;
    .login-bg {
      display: none;
    }
    .login-form-wrap {
      width: 100%;
      height: 100%;
      padding: 0 12px;
      .login-form {
        padding: 20px 10px;
      }
    }
  }
}

@media only screen and (min-width: 992px) {
  .login-wrapper {
    height: 100vh;
    .login-bg {
      height: 100vh;
    }
  }
}

@media only screen and (min-width: 1920px) {
  .login-wrapper {
    .login-bg {
      width: 61%;
    }
    .login-form-wrap {
      width: 39%;
      padding: 0 100px;
      .logo {
        margin-bottom: 30px;
        padding-bottom: 45px;
      }
      .login-form {
        padding: 25px 35px;
      }
      h5 {
        padding-bottom: 20px;
        margin: 0 0 20px;
      }
    }
  }
}
</style>