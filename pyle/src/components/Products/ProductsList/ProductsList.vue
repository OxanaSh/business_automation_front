<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">


     <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0">
<!--                <div class="form-check checkbox">
                  <input class="form-check-input" type="checkbox" id="test_1" />
&lt;!&ndash;                 <label class="form-check-label" for="test_1"> IMAGE </label>&ndash;&gt;
                </div>-->
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Назва
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Ціна
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Бренд
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                <img
                    class="ms-2"
                    src="../../../assets/img/icons/up-down-aroow.svg"
                    alt="Image"
                />
                <select v-model="apparelTypeHeader" class="bg-white border-0 rounded-1 fs-14" style="padding-bottom: 0px; background-image:none;" name="apparelTypeHeader" id="ppcars" >
                  <option :value="-1" :key="-1">Тип</option>
                  <option v-for="type in typeList" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                <img
                    class="ms-2"
                    src="../../../assets/img/icons/up-down-aroow.svg"
                    alt="Image"
                />
                <select v-model="apparelColourHeader" class="bg-white border-0 rounded-1 fs-14" style="padding-bottom: 0px; background-image:none;" name="apparelColourHeader">
                  <option :value="-1" :key="-1">Колір</option>
                  <option v-for="colour in colourList" :key="colour.id" :value="colour.id">{{ colour.name }}</option>
                </select>
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Розмір
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                <img
                    class="ms-2"
                    src="../../../assets/img/icons/up-down-aroow.svg"
                    alt="Image"
                />
                <select v-model="apparelLocationHeader" class="bg-white border-0 rounded-1 fs-14" style="padding-bottom: 0px; background-image:none;" name="apparelWarehouseHeader">
                  <option :value="-1" :key="-1">Локація</option>
                  <option v-for="warehouse in warehouseList" :key="warehouse.id" :value="warehouse.id">{{ warehouse.name }}</option>
                </select>
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Статус
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Створено
              </th>
<!--           <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">
                ACTION
              </th>-->
            </tr>
          </thead>
          <tbody>

          <template v-for="pack in filteredTable()" :key="pack.id">
            <tr @click="toggleExpand(pack.id)">
              <td class="shadow-none fw-normal text-black title ps-0">
                <div class="d-flex align-items-center product-item">
                  <div class="form-check checkbox me-25">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="pack.id"
                      :value="pack.id"
                      v-model="pack.selected"
                    >
                    <label class="form-check-label" :for="pack.id" style="display: inline"> </label>
                  </div>
<!--              <img :src="product.image" alt="Image" />-->
                </div>
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-black title">
                {{ pack.apparels[0]?.code_name }}
                <template v-if="pack.barcode">
                ({{ pack.barcode }})
                </template>
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
                {{ pack.price }}
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
                {{ pack.apparels[0]?.brand }}
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
                <template v-if="typeList">
                {{ typeList.find((element) => pack.apparels[0]?.type == element.id)?.name }}
                </template>
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
<!--                <template v-if="colourList">
                {{ colourList.find((element) => pack.apparels[0]?.colour == element.id)?.name }}
                </template>-->
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
<!--                <template v-if="sizeList">
                {{ sizeList.find((element) => pack.apparels[0]?.size == element.id)?.name }}
                </template>-->
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
                <template v-if="warehouseList">
                {{ warehouseList.find((element) => pack.apparels[0]?.warehouse == element.id)?.name }}
                </template>
              </td>
              <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                <template v-if="pack.date_sold">
                  <p>Продано {{pack.date_sold}}</p>
                </template>
              </td>
              <td class="shadow-none lh-1 fs-16 fw-normal text-paragraph">
                {{ formatDate(pack.date_added) }}
              </td>
<!--              <td class="shadow-none lh-1 text-end pe-0">
                <div class="button-group d-flex flex-wrap align-items-center">
                  <router-link to="/product-details" class="" title="View">
                    <img src="../../../assets/img/icons/eye.svg" alt="Image" />
                  </router-link>
                  <router-link :to="'/edit-product/' + product.id " class="" title="Edit">
                    <img src="../../../assets/img/icons/edit.svg" alt="Image" />
                  </router-link>
                  <a
                    class="delete-btn"
                    data-bs-toggle="offcanvas"
                    href="#deletePopup"
                    v-on:click="deleteApparel(product.id, product)"
                    role="button"
                    aria-controls="deletePopup"
                  >
                    <img
                      src="../../../assets/img/icons/close.svg"
                      alt="Image"
                    />
                  </a>
                </div>
              </td>-->
            </tr>



            <template v-if="expandedItems?.includes(pack.id)">
              <template v-for="apparel in pack.apparels" :key="apparel.id">
              <tr>
                <td class="shadow-none">
                  <div class="d-flex align-items-center product-item">
                    <div class="form-check checkbox me-25">
                      <input
                          class="form-check-input"
                          type="checkbox"
                          :id="apparel.id"
                          :value="apparel.id"
                          v-model="apparel.selected"
                      >
                      <label class="form-check-label" :for="apparel.id" style="display: inline;"> </label>
                    </div>
                    <!--              <img :src="product.image" alt="Image" />-->
                  </div>
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal">
                  {{ apparel.code_name }}
                  <template v-if="apparel.barcode">
                    ({{ apparel.barcode }})
                  </template>
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                  {{ apparel.price }}
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                  {{ apparel.brand }}
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                  <template v-if="typeList">
                    {{ typeList.find((element) => apparel.type == element.id)?.name }}
                  </template>
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                  <template v-if="colourList">
                    {{ colourList.find((element) => apparel.colour == element.id)?.name }}
                  </template>
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                  <template v-if="sizeList">
                    {{ sizeList.find((element) => apparel.size == element.id)?.name }}
                  </template>
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                  <template v-if="warehouseList">
                    {{ warehouseList.find((element) => apparel.warehouse == element.id)?.name }}
                  </template>
                </td>
                <td class="shadow-none lh-1 fs-12 fw-normal text-paragraph">
                <template v-if="pack.date_sold">
                  <p>Продано {{pack.date_sold}}</p>
                </template>
                </td>
                <td class="shadow-none lh-1 text-end pe-0">
                  <div class="button-group d-flex flex-wrap align-items-center">
                    <router-link to="/product-details" class="" title="View">
                      <img src="../../../assets/img/icons/eye.svg" alt="Image" />
                    </router-link>
                    <router-link :to="'/edit-product/' + apparel.id " class="" title="Edit">
                      <img src="../../../assets/img/icons/edit.svg" alt="Image" />
                    </router-link>
                    <a
                        class="delete-btn"
                        data-bs-toggle="offcanvas"
                        href="#deletePopup"
                        v-on:click="deleteApparel(apparel.id, apparel)"
                        role="button"
                        aria-controls="deletePopup"
                    >
                      <img
                          src="../../../assets/img/icons/close.svg"
                          alt="Image"
                      />
                    </a>
                  </div>
                </td>
              </tr>
              </template>
            </template>



          </template>


          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="row pb-45 align-items-center">
    <div class="col-sm-6">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start page-unit"
      >
        <span class="fs-13">Showing product per page</span>
        <select class="text-title border-0 fs-14 bg-transparent">
          <option value="0">10</option>
          <option value="1">20</option>
          <option value="2">30</option>
        </select>
      </div>
    </div>
    <div class="col-sm-6 text-sm-end text-center">
      <ul class="page-nav list-style">
        <li>
          <a @click="prevPage">
            <img
              src="../../../assets/img/icons/left-arrow-purple.svg"
              alt="Image"
            />
          </a>
        </li>
<!--        <li><a href="#" class="active">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>-->
        <li>
          <a @click="nextPage">
            <img
              src="../../../assets/img/icons/right-arrow-purple.svg"
              alt="Image"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="delete-popup offcanvas offcanvas-end border-0"
    tabindex="-1"
    id="deletePopup"
  >
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your product is deleted from the list.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from 'axios';
import jsPDF from 'jspdf';
import JsBarcode from "jsbarcode";

interface Colour {
  id: string;
  name: string;
}

interface Size {
  id: string;
  name: string;
}

interface Apparel {
  id: string,
  type: string,
  code_name: string,
  colour: string,
  size: string,
  price: number,
  warehouse: string,
  brand: string,
  date_added: string,
  date_sold: string,
  barcode: string,
  selected: boolean,
}

interface Pack{
  id: string,
  date_added: string,
  date_sold: string,
  price: number,
  apparels: Apparel[],
  barcode: string,
  selected: boolean,
}

export default defineComponent({
  name: "ProductsList",
  props: ["searchWords"],
  data() {
    return {
      apparelList: [] as Apparel[],
      packList: [] as Pack[],
      typeList: [],
      sizeList: [] as Size[],
      colourList: [] as Colour[],
      warehouseList: [],
      items: [],
      expandedItems: ref([{}]),
      pageSize: 5,
      currentPage: 1,
      full_apparelList: [],
      full_packList: [] as Pack[],
      apparelTypeHeader: ref(-1),
      apparelColourHeader: -1,
      apparelSizeHeader: -1,
      apparelLocationHeader: -1,
      apparelStatusHeader: -1,
      selectedItems: [],
    };
  },
  mounted() {
    this.getApparels()
    this.getPacks()
    this.getTypes()
    this.getSizes()
    this.getColours()
    this.getWarehouses()
  },
  computed:{
    /*sortedTable:function Pack() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.full_packList./!*sort((a, b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).*!/filter((row: number, index: number) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }*/
  },
  methods: {
    toggleExpand(id: number) {
      if(this.expandedItems){
      if (this.expandedItems.includes(id))
      {
        this.expandedItems.splice(this.expandedItems.indexOf(id), 1)
      }
      else {
        this.expandedItems.push(id)
      }
      }
    },
    getApparels() {
      axios
      .get("/api/v1/get_apparels/")
      .then(response => {
        this.apparelList = response.data;
        this.full_apparelList = response.data;
      })
          .catch(error => {
            console.log(error);
          })
    },
    getPacks() {
      axios
      .get("/api/v1/packs/")
      .then(response => {
        this.packList = response.data;
        this.full_packList = response.data;
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

          })
          .catch(error => {
        console.log(error);
      })
    },
    deleteApparel(idToDelete: string, apparelToDelete: Apparel) {
      axios
          .delete("/api/v1/apparels/"+ idToDelete)
          .then(response => {
            console.log(response);
            this.$router.go(0)
          })
          .catch(error => {
            console.log(error);
          })
    },
    nextPage(){
      if((this.currentPage*this.pageSize) < this.full_packList.length) this.currentPage++;
    },
    prevPage(){
      if(this.currentPage > 1) this.currentPage--;
    },
    filteredTable() {
      return this.packList.filter((item: Pack) => {
        /*console.log("type:", this.apparelTypeHeader);
        console.log("item:", item);*/
        if(this.apparelTypeHeader === -1){ return true; }
        return (this.apparelTypeHeader == parseInt(item.apparels[0]?.type))
      }).filter((item: Pack) => {
        /*console.log("colour:", this.apparelColourHeader);
        console.log("item:", item);*/
        if(this.apparelColourHeader === -1){ return true; }
        return (this.apparelColourHeader == parseInt(item.apparels[0]?.colour))
      }).filter((item: Pack) => {
        /*console.log("wharehouse:", this.apparelLocationHeader);
        console.log("item:", item);*/
        if(this.apparelLocationHeader === -1){ return true; }
        return (this.apparelLocationHeader == parseInt(item.apparels[0]?.warehouse))
      }).filter((item: Pack) =>{
        /*console.log("searchWords:", this.searchWords);*/
        if(this.searchWords != ""){ return (item.apparels[0]?.code_name.toLowerCase().indexOf(this.searchWords) > -1 || item.apparels[0]?.brand.toLowerCase().indexOf(this.searchWords) > -1); }
        return true;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    },
    printBarcodes(){

      let pdfName = 'test';
      var doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [60, 100]
      });

      doc.setLanguage("uk")
      doc.deletePage(1)
      doc.addFont('https://fonts.gstatic.com/s/notoserif/v23/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwM0Lhq_Szw.ttf', 'Noto Serif', 'normal');
      doc.setFont('Noto Serif');
      doc.setFontSize(8)

      var canvas = document.createElement("canvas");

      this.packList.forEach(p => {
        if(p.selected){

          doc.addPage()

        JsBarcode(canvas, p.barcode, {
          format: "ean13",
          textMargin: 0,
          flat: true,
          displayValue: false
        });


        let currentColour = this.colourList.filter((colour: Colour) => {
          if(p.apparels[0].colour == colour.id) {
            console.log(colour)
            return colour
          }
        })

        doc.text("Пачка " + p.apparels[0].brand,
            5, 6, {align: "left", lineHeightFactor: 1});
        doc.text("Колір " + currentColour[0].name + ", " + p.price, 5, 13, {align: "left", lineHeightFactor: 1})
        doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 0, 16, 100, 40);
        }

        p.apparels.forEach(apparel => {
          if(apparel.selected){
            doc.addPage()

            JsBarcode(canvas, apparel.barcode, {
              format: "ean13",
              textMargin: 0,
              flat: true,
              displayValue: false
            });


            let currentSize = this.sizeList.filter((size: Size) => {
              if(apparel.size == size.id) {
                console.log(size)
                return size
              }
            });

            doc.text(apparel.brand + ", " + currentSize[0].name,
                5, 6, {align: "left", lineHeightFactor: 1});
            doc.text(apparel.price.toString(), 5, 13, {align: "left", lineHeightFactor: 1})
            doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 0, 16, 100, 40);

          }
        })

      })

      console.log(this.packList[0].barcode + ' print barcodes works')

      doc.save(pdfName + ".pdf");

    },

    formatDate(dateTimeString: string) {
      let date = new Date(dateTimeString);
      return date.toLocaleDateString("uk", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
      })
    }
  },

});
</script>