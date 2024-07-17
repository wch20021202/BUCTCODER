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
@ApiModel(value = "ATcoder对象",description = "")
public class ATcoder implements Serializable{
    public static final long SerserialVersionUID = 1L;
    @ApiModelProperty("id")
    @TableId(value = "ac_id", type = IdType.INPUT)
    private String acId;

    @ApiModelProperty("日期")
    private String acDate;

    @ApiModelProperty("比赛名称")
    private String acContest;

    @ApiModelProperty("排名")
    private String acRank;

    @ApiModelProperty("表现")
    private String acPerformance;

    @ApiModelProperty("新积分")
    private String acNewrating;

    @ApiModelProperty("积分变化")
    private String acDiff;

    @ApiModelProperty("比赛次数")
    private String acCount;

    @ApiModelProperty("最高积分")
    private String acMaxrating;

}
