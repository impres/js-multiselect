<template>
    <div class="multiselect" v-click-outside="hideOptions">
        <select :multiple="multiple" v-model="model" :name="name" v-if="spoofSelect">
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
            >
                {{ option.name }}
            </option>
        </select>

        <div class="multiselect__mobile"></div>

        <div class="multiselect__label" @click="showOptions">
            <div class="multiselect__label__value">
                {{ label }}
            </div>

            <div class="multiselect__label__arrow">
                <img src="./assets/icons/keyboard_arrow_down.svg" v-if="model.length === 0" />
                <img src="./assets/icons/check.svg" v-else />
            </div>
        </div>

        <div class="multiselect__options" v-if="optionsVisible">
            <div class="multiselect__options__inner">
                <div class="multiselect__options__top multiselect__search">
                    <input type="text" placeholder="zoeken..." v-model="searchValue">

                    <button type="button" @click.prevent="resetSearchValue()">
                        <img src="./assets/icons/search.svg" alt="" v-if="searchValue.length === 0">
                        <img src="./assets/icons/close.svg" alt="" v-else>
                    </button>
                </div>

                <div class="multiselect__options__middle">
                    <ul v-if="optionListItems.length > 0">
                        <li
                            v-for="(item, index) in optionListItems" :key="index"
                        >
                            <label class="multiselect__checkbox">
                                <input
                                    v-if="checkboxType == 'radio'"
                                    :value="item.value"
                                    :name="id"
                                    type="radio"
                                    v-model="model"
                                />
                                <input
                                    v-else-if="checkboxType == 'checkbox'"
                                    :value="item.value"
                                    :name="id"
                                    type="checkbox"
                                    v-model="model"
                                />

                                <span v-html="$options.filters.highlight(item.name, searchValue)" />
                            </label>
                        </li>
                    </ul>
                    <div v-else>geen resultaten</div>
                </div>

                <div class="multiselect__options__bottom">
                    <button type="button" class="multiselect__btn" @click.prevent="hideOptions">
                        <span v-if="optionMenuHasChanges">Opslaan</span>
                        <span v-else>Sluiten</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _filter from 'lodash.filter';
import _find from 'lodash.find';
import './assets/scss/main.scss';

export default {
    name: 'multiselect',
    data() {
        return {
            model: [],
            cachedModel: null,
            optionsVisible: false,
            searchValue: '',
            id: null,
            optionMenuHasChanges: false,
            optionsPosition: 'top',
        };
    },
    props: {
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        placeholder: {
            type: String,
            default: 'Selecteer een waarde',
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: 'multiselect',
        },
        spoofSelect: {
            type: Boolean,
            default: false,
        },
        activeItems: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    filters: {
        highlight(value, query) {
            if (!value || !query) {
                return value;
            }

            return value.replace(new RegExp(query, 'gi'), (match) => {
                const $html = `<span class="multiselect__highlight-text">${match}</span>`;

                return $html;
            });
        },
    },
    directives: {
        'click-outside': {
            bind(el, binding, vnode) {
                el.event = (event) => {
                    if (!(el === event.target || el.contains(event.target))) {
                        vnode.context[binding.expression](event);
                    }
                };

                document.body.addEventListener('click', el.event);
            },
            unbind(el) {
                document.body.removeEventListener('click', el.event);
            },
        },
    },
    mounted() {
        this.id = this._uid;

        if (this.multiple) {
            this.activeItems.forEach((value) => {
                const foundedItemInOptions = _find(this.options, { value });

                if (foundedItemInOptions) {
                    this.model.push(foundedItemInOptions.value);
                }
            });
        } else if (this.activeItems.length > 0) {
            this.model = this.activeItems[0];
        }

        this.cachedModel = JSON.stringify(this.model);
    },
    watch: {
        model() {
            if (this.cachedModel === JSON.stringify(this.model)) {
                this.optionMenuHasChanges = false;
            } else {
                this.optionMenuHasChanges = true;
            }

            if (!this.multiple) {
                this.hideOptions();
            }
        },
    },
    computed: {
        label() {
            const label = [];
            let items = this.model;

            if (typeof this.model !== 'object') {
                items = [this.model];
            }

            items.forEach((value) => {
                const item = _find(this.options, {
                    value,
                });

                label.push(item.name);
            });

            if (label.length === 0) {
                return this.placeholder;
            }

            return label.join(', ');
        },
        optionListItems() {
            return _filter(this.options, (value) => {
                const found = value.name.toString().toLowerCase().indexOf(this.searchValue) !== -1;

                return found;
            });
        },
        checkboxType() {
            const type = this.multiple ? 'checkbox' : 'radio';

            return type;
        },
    },
    methods: {
        showOptions() {
            this.cachedModel = JSON.stringify(this.model);
            this.optionsVisible = true;
            this.saveScrollPosition();
        },
        hideOptions() {
            this.optionsVisible = false;

            if (this.isMobile()) {
                this.resetScrollPosition();
            }

            if (this.optionMenuHasChanges) {
                this.$emit('change', this.model);
            }

            this.$emit('close', this.model);

            this.resetSearchValue();
            this.optionMenuHasChanges = false;
        },
        saveScrollPosition() {
            const scrollPosition = window.pageYOffset;
            this.scrollPosition = scrollPosition;
        },
        resetScrollPosition() {
            window.scrollTo(0, this.scrollPosition);
        },
        resetSearchValue() {
            this.searchValue = '';
        },
        isMobile() {
            const $mobileEl = this.$el.querySelector('.multiselect__mobile');
            const style = $mobileEl.currentStyle ?
                $mobileEl.currentStyle.display :
                getComputedStyle($mobileEl, null).display;

            const isMobile = (style === 'block');

            return isMobile;
        },
    },
};
</script>
