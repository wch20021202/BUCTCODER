package com.buct.acmer.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "Student对象", description = "")

public class Student implements Serializable {
    private static final long serialVersionUID = 1L;


    @TableId(value = "stu_no", type = IdType.INPUT)
    @ApiModelProperty("学生学号")
    private String stuNo;

    @ApiModelProperty("学生姓名")
    private String stuName;

    @ApiModelProperty("学生年级")
    private String stuClass;

    @ApiModelProperty("学生atcoder的id")
    private String stuAcId;

    @ApiModelProperty("学生codeforce的id")
    private String stuCfId;
}
