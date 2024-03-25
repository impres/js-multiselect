    $mq-breakpoints: (
        small:  320px,
        medium:  740px,
        large: 980px
    );

    @import "sass-mq";

    body,
    html {
        height: 100%;
        font-family: arial;
    }

    .multiselect {
        position: relative;
        box-sizing: border-box;

        img {
            display: block;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }

        .highlightText {
            font-weight: bold;
        }

        .multiselect__search {
            position: relative;
            margin-bottom: 15px;

            input {
                width: 100%;
                height: 50px;
                font-size: inherit;
                padding: 0 10px;
                padding-right: 60px;
                border: none;
                border-bottom: 1px solid #000;
                background-color: transparent;
            }

            button {
                position: absolute;
                top: 0;
                right: 0;
                width: 50px;
                height: 100%;
                display: flex;
                align-items: center;
                background-color: transparent;
                border: none;
                justify-content: center;
            }
        }

        .multiselect__btn {
            border: 2px solid #000;
            line-height: 1;
            display: block;
            padding: 15px;
            width: 100%;
            font-size: inherit;
            background-color: #FFF;
        }

        .multiselect__checkbox {
            position: relative;
            display: flex;
            align-items: center;

            input {
                position: absolute;
                opacity: 0;
                visiblity: hidden;
                z-index: 1000;
            }

            input {
                + span {
                    $size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding-left: $size + 10px;
                    height: $size;

                    &:before,
                    &:after {
                        content: "";
                        width: $size;
                        height: $size;
                        background-color: transparent;
                        display: block;
                        position: absolute;
                        left: 0;
                        top: calc(50% - #{$size / 2});
                        border-radius: 3px;
                    }

                    &:before {
                        border: 1px solid #000;
                    }

                    &:after {
                        opacity: 0;
                        background-image: url(./assets/icons/check.svg);
                        background-size: cover;
                        font-size: 5px;
                    }
                }

                &:checked {
                    + span {
                        &:after {
                            opacity: 1;
                        }
                    }
                }
            }

            input[type="checkbox"] {
                + span {
                    
                }
            }

            input[type="radio"] {
                + span {
                    &:before {
                        display: none;
                    }
                }
            }
        }

        .multiselect__label {
            position: relative;
            border: 1px solid #C1C1C1;
            border-radius: 4px;
            background-color: #FBFAFA;
            display: flex;
            align-items: center;
            height: 56px;
            padding: 5px 20px;
            cursor: pointer;

            .multiselect__label__value {
                flex: 1 1 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 10px;
            }
        }

        .auto {
            flex: 1 1 auto;
        }

        .shrink {
            flex: 1 0 auto;
        }

        .multiselect__options {
            $space: 5px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
            padding: 15px;
            background-color: #FBFAFA;

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                height: auto;
                padding: 10px 0;

                li {
                    padding: 0;
                    margin: 0 0 10px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }

            .multiselect__btn {
                margin-top: 10px;
                flex: 1 0 auto;
            }

            .multiselect__options__inner {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .multiselect__options__top {
                flex: 1 0 auto;
            }

            .multiselect__options__middle {
                flex-direction: column;
                flex: 1 1 100%;
                overflow-y: auto;
            }

            .multiselect__options__bottom {
                flex: 1 0 auto;
            }

            @include mq(medium) {
                position: absolute;
                top: 5px;
                left: 5px;
                width: calc(100% - 10px);
                height: auto;

                ul {
                    max-height: 200px;
                }
            }
        }
    }