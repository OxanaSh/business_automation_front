<template>
  <form @submit.prevent="addPack" class="pb-60">
    <div class="row">
      <div class="col-xxl-9 col-xl-8 col-lg-8 pe-xxl-6 mb-md-25">
        <div class="row gx-xxl-6">
          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Назва</label>
              <input
                type="text"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Введіть назву товару"
                required v-model="apparel.code_name"
              />
              <span class="text-red fs-12 d-none">Це поле обов'язкове!</span>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Фірма</label>
              <input
                type="text"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Введіть назву фірми"
                required v-model="apparel.brand"
              />
              <span class="text-parageaph d-block w-100 fs-12 mt-1 d-none">
                Scan your barcode and select the correct symbology below.
              </span>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Тип</label>
              <select class="bg-white border-0 rounded-1 fs-14 text-optional" v-model="apparel.type">
                <option v-for="type in typeList" :key="type.id" :value="type.id">{{ type.name }}</option>
              </select>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">
                Колір
              </label>
              <select class="bg-white border-0 rounded-1 fs-14 text-optional" v-model="apparel.colour">
                <option v-for="colour in colourList" :key="colour.id" :value="colour.id">{{ colour.name }}</option>
              </select>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Оптова Ціна</label>
              <input
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Введіть ціну"
                required v-model="pack.price"
              />
              <span class="text-red fs-12 d-none">Це поле обов'язкове</span>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Ціна за одиницю</label>
              <input
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Введіть ціну за одиницю"
                required v-model="apparel.price"
              />
              <span class="text-red fs-12 d-none">Це поле обов'язкове</span>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Локація</label>
              <select class="bg-white border-0 rounded-1 fs-14 text-optional" v-model="apparel.warehouse">
                <option v-for="warehouse in warehouseList" :key="warehouse.id" :value="warehouse.id">{{ warehouse.name }}</option>
              </select>
            </div>
          </div>

          <div v-for="size in sizeList" :key="size.id" class="col-lg-2">
            <div class="form-check checkbox me-25">
              <input  class="form-check-input" type="checkbox" :id="size.id" :value="size.id" v-model="checkedSizes">
              <label :for="size.id" class="form-check-label" style="display: inline">{{ size.name }}</label>
            </div>
          </div>
<!--
          <div v-for="size in sizeList" :key="size.id" class="d-flex align-items-center product-item">
            <div class="form-check checkbox">
              <input
                  class="form-check-input"
                  type="checkbox"
                  id="size.id" value="size.name"
              />
              <label class="form-check-label" for="size.id">{{ size.name }}</label>
            </div>
          </div>
-->

<!--          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">
                Product Quantity
              </label>
              <input
                type="number"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="01"
                required
              />
              <span class="text-red fs-12 d-none">This field is required!</span>
            </div>
          </div>-->

<!--          <div class="col-lg-12">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Notes</label>
              <textarea
                cols="30"
                rows="10"
                placeholder="Add a note"
                class="d-block w-100 bg-white border-0 rounded-1 resize-none fs-14 text-title"
              ></textarea>
            </div>
          </div>-->

          <div class="col-12" style="padding-top: 20px;">
            <button
              class="btn style-one transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Submit Products
            </button>
          </div>
        </div>
      </div>

<!--      <div class="col-xxl-3 col-xl-4 col-lg-4">
        <AddImages />
      </div>-->
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddImages from "./AddImages.vue";
import axios from "axios";

export default defineComponent({
  name: "CreateProducts",
  components: {
    /*AddImages,*/
  },
  props: ['prop_id'],
  data(){
    return {
      checkedSizes: [],
      typeList: [],
      sizeList: [],
      colourList: [],
      warehouseList: [],
      apparel: {
        id: "",
        type: "",
        code_name: "",
        colour: "",
        size: "",
        price: "",
        warehouse: "",
        brand: "",
        date_added: "",
        date_sold: ""
      },
      pack: {
        id: "",
        price: "",
        date_added: "",
        date_sold: ""
      }
    }
  },
  mounted() {
    this.getTypes()
    this.getSizes()
    this.getColours()
    this.getWarehouses()
    if(this.prop_id !== undefined){
      this.getApparel()
    }
  },
  methods: {
    addPack(){
      const formData = new FormData;
      formData.append("apparel.id", this.apparel.id);
      formData.append("apparel.code_name", this.apparel.code_name);
      formData.append("apparel.colour", this.apparel.colour);
      formData.append("apparel.size", this.apparel.size);
      formData.append("apparel.price", this.apparel.price);
      formData.append("apparel.warehouse", this.apparel.warehouse);
      formData.append("apparel.brand", this.apparel.brand);
      formData.append("apparel.type", this.apparel.type);
      formData.append("apparel.pack.price", this.pack.price);
      this.checkedSizes.forEach((size) => {
        formData.append("sizes[]", size);
      })
      console.log(formData);
      let url = "/api/v1/packs/";
      /*if(this.prop_id !== undefined){
        console.log(url);
        console.log(this.prop_id);
        url = "/api/v1/apparels/" + this.prop_id;
      }*/
      axios.post(url, formData)
      .then(res => {
        if (res.status != 200) {
          throw new Error(res.statusText);
        }
        this.apparel = {
          id: "",
          type: "",
          code_name: "",
          colour: "",
          size: "",
          price: "",
          warehouse: "",
          brand: "",
          date_added: "",
          date_sold: ""
        }
        this.pack = {
          id: "",
          price: "",
          date_added: "",
          date_sold: ""
        }
        this.$router.push({ path: "/create-pack" });
      }).catch(err => {console.log(err)})
    },
    getApparel(){
      axios
          .get("/api/v1/apparels/"+this.prop_id)
          .then(response => {
            this.apparel = response.data;
            console.log(this.apparel);
          })
          .catch(error => {
            console.log(error);
          })
    },
    getTypes() {
      axios
          .get("/api/v1/get_types/")
          .then(response => {
            this.typeList = response.data;
            /*console.log(this.typeList);*/
          })
          .catch(error => {
            console.log(error);
          })
    },
    getSizes() {
      axios
          .get("/api/v1/get_sizes/")
          .then(response => {
            this.sizeList = response.data;
            /*console.log(this.sizeList);*/
          })
          .catch(error => {
            console.log(error);
          })
    },
    getColours() {
      axios
          .get("/api/v1/get_colours/")
          .then(response => {
            this.colourList = response.data;
            /*console.log(this.colourList);*/
          })
          .catch(error => {
            console.log(error);
          })
    },
    getWarehouses() {
      axios
          .get("/api/v1/get_warehouses/")
          .then(response => {
            this.warehouseList = response.data;
            /*console.log(this.warehouseList);*/
          })
          .catch(error => {
            console.log(error);
          })
    },
  }
});
</script>