import Vue from "vue";
import upperCase from "@/components/upperCase";

describe("upperCase.vue", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(upperCase);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector(".hello h1").textContent).toEqual(
      "Welcome to Your Vue.js App"
    );
  });
});
