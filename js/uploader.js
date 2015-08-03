/**
 * Created by amanu on 7/30/15.
 *
 * Each uploader will be a table,
 * each row will represent an image upload task
 * each task can be saved, or deleted
 * after image is uploaded, image some id is received, and after
 *
 * Needed Components,
 *  a table,
 *  a row
 *  a data for additional columns
 *
 */
(function ($) {

    window.UploaderConfig = {
        max: 4,
        placeHolder: "../images/placeholder",
        addButtonClass: 'btn btn-sm btn-success uploader-add',
        addButtonText: '<i class="fa fa-plus"></i>',
        saveAllButtonClass: 'btn btn-sm btn-primary',
        saveAllButtonText: '<i class="fa fa-save"></i>',
        removeAllButtonClass: 'btn btn-sm btn-danger',
        removeAllButtonText: '<i class="fa fa-remove"></i>',
        saveButtonClass: 'btn btn-sm btn-primary',
        saveButtonText: '<i class="fa fa-save"></i></a>',
        removeButtonClass: 'btn btn-sm btn-danger',
        removeButtonText: '<i class="fa fa-remove"></i>',
        uploaderClass: 'table table-striped table-condensed',
        commandRowClass: '',
        imageRowClass: '',
        imageContainerClass: '',
        loadingImage: '<div class="uploader-loading"><i class="fa fa-spin fa-spinner fa-3x"></i></div>',
        imageClass: 'img-responsive img-thumbnail',
        inputContainerClass: 'input-group input-group-sm',
        textInputClass: 'input-sm',
        numberInputClass: 'input-sm',
        fileInputClass: '',
        longTextInputClass: '',
        set: function (settings) {
        }
    };

    window.Uploader = function ($element, settings) {
        var uc = UploaderConfig;
        UploaderConfig.$element = $element;

        var Uploader = {
            $element: $element,
            $table: null,
            $commandRow: null,
            settings: {url: 'upload.html'},
            queue: [],
            rowCount: 0,

            addRow: function () {

                //Creating the row,
                var $newRow = Uploader.$table.find('.uploader-command-row')
                    .after('<tr>')
                    .next('tr');

                //add the columns needed
                $newRow
                    .append('<td>')
                    .children(':last-child')
                    .append('<div class="loading">')
                    .children(':last-child')
                    .append(uc.loadingImage)
                    .end()
                    .append('<input type="file" class="hide"/>')
                    .end()
                    .append('<td>')
                    .children(':last-child')
                    .append('<a href="javascript:;" class="uploader-save"></a> &nbsp;')
                    .children(':last-child')
                    .addClass(uc.saveButtonClass)
                    .append(uc.saveButtonText)
                    .attr('disabled', true)
                    .end()
                    .append('<a href="javascript:;" class="uploader-remove"></a>')
                    .children(':last-child')
                    .addClass(uc.removeButtonClass)
                    .append(uc.removeButtonText);

                if (Uploader.settings.inputs) {
                    for (c in Uploader.settings.inputs) {
                        var input = Uploader.settings.inputs[c]

                        switch (input.type) {
                            case 'text':
                                var $input = $newRow
                                    .append('<td>')
                                    .children(':last-child')
                                    .append('<div>')
                                    .children(':last-child')
                                    .addClass(uc.inputContainerClass)
                                    .append('<input type="text"/>')
                                    .children(':last-child')
                                    .addClass(uc.textInputClass);

                                break;
                        }

                        $input.attr('id', input.name)
                        $input.attr('name', input.name)
                        if ($.isFunction(input.callback)) {
                            input.callback($input);
                        }
                    }
                }

                //create the handlers

                //remove handler
                $newRow.find('.uploader-remove').click(this.removeRow);

                //when file is selected, que the image upload
                $newRow.find('input[type=file]').change(function () {
                    Uploader.fileSelected($newRow)
                }).click();

                //save handler
                $newRow.find('.save').click(function () {
                    //saveUpload();
                });

                //execute preparations


                return false;
            },
            removeRow: function () {
                //cancelUpload();
                $newRow.remove();
                return false;
            },

            construct: function () {
                //create the table
                var $table = $element
                    .append('<table>')
                    .children(':last-child')
                    .addClass(uc.uploaderClass)
                    .append('<tbody>')
                    .children(':last-child');

                this.$element = $element;
                this.$table = $table;

                //create the command row
                var $commandRow = $table.append('<tr>').children(':last-child');
                $commandRow.addClass(uc.commandRowClass);
                $commandRow.addClass('uploader-command-row');

                this.$commandRow = $commandRow;

                //command buttons
                $commandRow
                    .append('<td>')
                    .children(':last-child')
                    .css({width: '200px'})
                    .append('<a href="javascript:;" class="uploader-add">' + uc.addButtonText + '</a> &nbsp;')
                    .children(':last-child').addClass(uc.addButtonClass)
                    .end()
                    .append('<a href="javascript:;" class="uploader-save-all">' + uc.saveAllButtonText + '</a> &nbsp;')
                    .children(':last-child').addClass(uc.saveAllButtonClass)
                    .end()
                    .append('<a href="javascript:;" class="uploader-remove-all">' + uc.removeAllButtonText + '</a> &nbsp;')
                    .children(':last-child').addClass(uc.removeAllButtonClass)
                    .end();


                var $add = $commandRow.find('.uploader-add');
                var $saveAll = $commandRow.find('.uploader-save-all');
                var $removeAll = $commandRow.find('.uploader-remove-all');
                var rowCount = 0;

                $add.click(this.addRow);

                $saveAll.click(function () {
                    //Go around clicking all save buttons
                    $table.find('.uploader-save').click();
                });
            }
        }

        Uploader.construct();
        return $(this);
    };

    $(document).ready(function () {
        //create and attach an Uploader to the body
        $('body').first().uploader(
            {
                inputs: [{
                    name: 'description', type: 'text', callback: function ($element) {
                        console.log($element);
                    }
                }]
            });

    })


}(jQuery));

