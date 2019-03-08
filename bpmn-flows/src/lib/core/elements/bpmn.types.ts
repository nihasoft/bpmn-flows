import { UserTaskRect } from './shape/user.task.rect';
import { StartEventCircle } from './shape/start.event.circle';
import { EndEventCircle } from './shape/end.event.circle';
import { SubProcessRect } from './shape/sub.process.rect'
import { SequenceFlowPath } from './sequence/sequence.flow.path'
import { ExclusiveGatewayRhombus } from './shape/exclusive.gateway.rhombus';
import { ParallelGatewayRhombus } from './shape/parallel.gateway.rhombus';
import { ManualTaskRect } from './shape/manual.task.rect';
import { ScriptTaskRect } from './shape/script.task.rect';
import { LaneRect } from './shape/lane.rect';
import { ParticipantRect } from './shape/participant.rect';
import { BusinessRuleTaskRect } from './shape/business.rule.task.rect';
import { IntermediateEventCircle } from './shape/intermediate.event.circle';

export const BpmnTypes = {
    'userTask': UserTaskRect,
    'scriptTask': ScriptTaskRect,
    'manualTask': ManualTaskRect,
    'startEvent': StartEventCircle,
    'endEvent': EndEventCircle,
    'subProcess': SubProcessRect,
    'adHocSubProcess': SubProcessRect,
    'sequenceFlow': SequenceFlowPath,
    'exclusiveGateway': ExclusiveGatewayRhombus,
    'parallelGateway': ParallelGatewayRhombus,
    'lane': LaneRect,
    'participant': ParticipantRect,
    'businessRuleTask': BusinessRuleTaskRect,
    'intermediateThrowEvent': IntermediateEventCircle
}