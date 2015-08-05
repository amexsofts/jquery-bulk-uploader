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
        imageContainerClass: 'thumbnail',
        loadingImage: '<div class="uploader-loading"><i class="fa fa-spin fa-spinner fa-3x"></i></div>',
        imageClass: 'img-responsive img-thumbnail',
        inputContainerClass: 'input-group input-group-sm',
        textInputClass: 'input-sm',
        numberInputClass: 'input-sm',
        fileInputClass: '',
        longTextInputClass: '',
        set: function (settings) {
        },
        uploaders: [],
        done: function (uploader_id, task_id, url, message) {

            if (typeof this.uploaders[uploader_id] != 'undefined'
                && typeof this.uploaders[uploader_id].tasks[task_id] != 'undefined') {

                var task = this.uploaders[uploader_id].tasks[task_id];
                task.done(url, message);

            }
        }
    };


    $.fn.uploader = function (settings) {
        var $element = $(this);
        var uc = UploaderConfig;
        UploaderConfig.$element = $element;

        var Uploader = {
            $element: $element,
            $table: null,
            $commandRow: null,
            settings: settings,
            tasks: [], //TODO: Add a task scheduling and starting mechanism
            rowCount: 0,

            addToQueue: function ($row) {
                var task = {$row: $row};
                task.done = function (url, message) {
                    Uploader.doneUploading(this.$row, url, message);
                };
                Uploader.tasks.push(task);
                Uploader.uploadImage(task);
            },
            uploadImage: function (task) {
                var files = task.$row
                    .find('td:first-child input[type=file]').prop('files');

                if (typeof FormData == 'function') {

                    var formData = new FormData();
                    formData.append('upload', files[0]);
                    formData.append('uploader', 0);
                    formData.append('task', Uploader.rowCount - 1);
                    formData.append('callback', 'window.UploaderConfig.done');
                    formData.append('ajax', true);

                    $.ajax({
                        method: 'POST',
                        url: Uploader.settings.imageUploadUrl,
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function (e, f) {
                            //append the response to the body, then remove it
                            $('body').append('<script>').children(':last-child').append(e).remove();
                        }
                    })
                } else {
                    var $iframe = Uploader.createIframe(task.$row);

                    var $form = $iframe.contents().find('body')
                        .append('<form method="post" enctype="multipart/form-data" ></form>')
                        .children(':last-child')
                        .attr('action', Uploader.settings.imageUploadUrl);
                    $form
                        .append('<input type="hidden" name="task" value="' + (Uploader.rowCount - 1) + '"/>')
                        .append('<input type="hidden" name="uploader" value="' + (0) + '"/>')
                        .append('<input type="hidden" name="callback" value="window.top.window.UploaderConfig.done"/>')
                        .append('<input type="file" name="upload"/>')
                        .children(':last-child')
                        .prop('files', files);
                    $form.submit();
                }
            },
            createIframe: function ($row) {
                return $row
                    .find('td:first-child')
                    .append('<div class="progress"></div>')
                    .children(':last-child')
                    .attr('id', 'progress_' + this.rowCount)
                    .end()
                    .append('<iframe src=""><html></html></iframe>')
                    .children(':last-child')
                    .attr('name', 'image_frame_' + this.rowCount)
                    .attr('id', 'image_frame_' + this.rowCount);
            },
            fileSelected: function ($row) {
                Uploader.addToQueue($row);
            },
            cancelUpload: function () {
            },
            doneUploading: function ($row, url, message) {
                $row.children(':first-child') // this is the image cell
                    .children('*') //remove everything
                    .remove()
                    .end()
                    .prepend('<div>')
                    .children(':first-child')
                    .addClass(uc.imageContainerClass)
                    .append('<img>')
                    .children(':last-child')
                    .attr('src', url);

                $row.find('.uploader-save')
                    .attr('disabled', false)
                    .click(function () {
                        Uploader.saveUpload($row, url, message)
                    });
            },
            saveUpload: function ($row, url, message) {
                var values = {};
                $row.find('.uploader-input-container')
                    .each(function () {
                        var $input = $(this).find('.uploader-input').first();
                        if ($.isFunction($input.data('uploader-value'))) {
                            values[$input.attr('id')] = ($input.data('uploader-value'))($input);
                        } else {
                            values[$input.attr('id')] = $input.data('uploader-value');
                        }

                    });
                values.imageUploadUrl = url;
                values.message = message;

                $.ajax({
                    method: 'POST',
                    data: values,
                    url: Uploader.settings.saveUrl,
                    success: function (e) {
                        $row.addClass('bg-success')
                    },
                    error: function (e) {
                        $row.addClass('bg-danger')
                    }
                });
            },
            addRow: function () {
                var rowId = Uploader.rowCount++;

                //Creating the row,
                var $newRow = Uploader.$table.find('.uploader-command-row')
                    .after('<tr>')
                    .next('tr')
                    .attr('id', 'row_' + rowId);

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
                        var input = Uploader.settings.inputs[c];

                        var $inputContainer = $newRow
                            .append('<td>')
                            .children(':last-child')
                            .append('<div>')
                            .children(':last-child')
                            .addClass(uc.inputContainerClass)
                            .addClass('uploader-input-container');
                        var $input;
                        switch (input.type) {
                            case 'text':
                                $input = $inputContainer
                                    .append('<label>' + input.label + '</label>')
                                    .children(':last-child')
                                    .append('<br/>')
                                    .append('<input type="text"/>')
                                    .children(':last-child')
                                    .addClass('uploader-input')
                                    .addClass(uc.textInputClass);
                                break;
                            case 'hidden':
                                $input = $inputContainer
                                    .append('<label>' + input.label + '</label>')
                                    .children(':last-child')
                                    .append('<br/>')
                                    .append('<input type="hidden"/>')
                                    .children(':last-child')
                                    .addClass('uploader-input')
                                    .addClass(uc.textInputClass);
                                break;
                            case 'number':
                                $input = $inputContainer
                                    .append('<label>' + input.label + '</label>')
                                    .children(':last-child')
                                    .append('<br/>')
                                    .append('<input type="number"/>')
                                    .children(':last-child')
                                    .addClass('uploader-input')
                                    .addClass(uc.textInputClass);
                                break;
                            default:
                                $input = $inputContainer
                                    .append('<label>' + input.label + '</label>')
                                    .children(':last-child')
                                    .append(input.html)
                                    .children(':last-child')
                                    .addClass('uploader-input');
                                break;
                        }

                        if (input.value) {
                            $input.data('uploader-value', input.value);
                        } else {
                            $input.data('uploader-value', function () {
                                return $input.val();
                            });
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

                UploaderConfig.uploaders.push(Uploader);
            }

        };

        Uploader.construct();
        return $(this);
    };

    $(document).ready(function () {
        //create and attach an Uploader to the body
        $('body').first().uploader(
            {
                imageUploadUrl: '//amanu/lar/public/images/temp_upload',
                saveUrl: '//amanu/lar/public/images/save',
                inputs: [{
                    label: 'Description',
                    name: 'description',
                    type: 'text',
                    callback: function ($element) {

                    },
                    value: function ($element) {
                        return "Hello world";
                    }
                }, {
                    label: 'Alt',
                    name: 'alt',
                    html: '<div contentEditable="true">Click Here To add a description</div>',
                    callback: function ($element) {
                        $element.addClass('alert-warning')
                    },
                    value: function ($element) {
                        return $element.html();
                    }
                }]
            });

    })


}(jQuery));

