<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden"
  >
    <BreadcrumbMenu pageTitle="Список товарів" />
    <FilterContent @printBarcodeButtonPressed="handlePrintBarcodeButtonPressed" v-model:searchWords_prop="searchWords" ref="filterContent" btnText="Product" btnLink="/create-product" btn2Text="Створити товар" btn2Link="/create-pack"/>
    <ProductsList :searchWords="searchWords" ref="printBarcodeFunction"/>

    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";

import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import BreadcrumbMenu from "../../components/Common/BreadcrumbMenu.vue";
import FilterContent from "../../components/Common/FilterContent.vue";
import ProductsList from "../../components/Products/ProductsList/ProductsList.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";


export default defineComponent({
  name: "ProductsListPage",
  data() {
    return {
      searchWords: "",
    };
  },
  components: {
    MainHeader,
    MainSidebar,
    BreadcrumbMenu,
    FilterContent,
    ProductsList,
    MainFooter,
  },
  methods: {
    handlePrintBarcodeButtonPressed() {
      const childComponent =
          this.$refs.printBarcodeFunction as InstanceType<typeof ProductsList>;
      if (childComponent) {
        childComponent.printBarcodes();
      } else {
        console.log('Child component reference is undefined.');
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  margin: 0 -10px;
  .card {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>